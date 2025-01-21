import { Button, Form, Input, message, Modal, Select, Typography } from "antd";
import dayjs from "dayjs";
import { ParkingCardInterface, TypeCardInterface } from "../../../../../interfaces/Carpark";
import { GetListTypeCard } from "../../../../../services/https";
import { useEffect, useState } from "react";
const { Text } = Typography;

const AddCardModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onAddCard: (data: any) => void;
  getParkingCards: () => Promise<void>;
  cards: ParkingCardInterface[];
}> = ({ visible, onCancel, onAddCard, getParkingCards, cards }) => {
  const [form] = Form.useForm();
  const [typeCardOptions, setTypeCardOptions] = useState<TypeCardInterface[]>([]);
  const [latestCard, setLatestCard] = useState<ParkingCardInterface>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchData();
      getParkingCards().then(() => {
        const lastCard = cards.length > 0 ? cards[cards.length - 1] : null;
        if (lastCard) {
          setLatestCard({
            ...lastCard,
            ID: String(Number(lastCard.ID) + 1),
          });
          form.setFieldsValue({ ID: String(Number(lastCard.ID) + 1) });
        } else {
          setLatestCard(undefined);
        }
      });
    }
  }, [visible]);

  const fetchData = async () => {
    try {
      const response = await GetListTypeCard();
      if (response.status === 200) {
        setTypeCardOptions(
          response.data.map(
            (item: { ID: any; Type: any; ExpiryYear: any }) => ({
              value: item.ID,
              label: item.Type,
              ExpiryYear: item.ExpiryYear,
            })
          )
        );
      }
    } catch (error) {
      message.error("Failed to load card types.");
    }
  };

  const handleTypeCardChange = (
    value: TypeCardInterface,
    option?: TypeCardInterface | TypeCardInterface[]
  ) => {
    if (value && option && Array.isArray(option) === false) {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() + (option.ExpiryYear || 0)); // เพิ่มปีจาก ExpiryYear
      const formattedDate = dayjs(currentDate).format("YYYY-MM-DD"); // ฟอร์แมตวันที่
      form.setFieldsValue({ ExpiryDate: formattedDate });
      setReload(!reload);
    }
  };

  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const newCardData = {
          ID: (Number(cards[cards.length - 1]?.ID) + 1).toString().padStart(4, "0"),
          IsPermanent: values.CardType === "permanent", // เช็คประเภทบัตร
          UserID: values.UserID, // กรอก UserID ที่เลือก
          ExpiryDate: values.ExpiryDate,
          StatusCardID: values.StatusCardID, // ใส่ Status ของบัตร
        };

        await onAddCard(newCardData);
        form.resetFields();
        message.success("Parking card added successfully!");
      })
      .catch(() => {
        message.error("Failed to add parking card.");
      });
  };

  return (
    <Modal
      title="Add Parking Card"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add Card
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={{ ID: latestCard?.ID }}
      >
        <Form.Item
          name="ID"
          label="Card ID"
          rules={[{ required: true, message: "Please input the card ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="IsPermanent"
          label="Card Type"
          rules={[{ required: true, message: "Please select the card type!" }]}
        >
          <Select options={[
            { label: 'Permanent', value: 'permanent' },
            { label: 'Temporary', value: 'temporary' }
          ]} />
        </Form.Item>

        <Form.Item
          name="TypeCard"
          label="Card Type"
          rules={[{ required: true, message: "Please select the card type!" }]}
        >
          <Select options={typeCardOptions} onChange={handleTypeCardChange} />
        </Form.Item>

        <Form.Item name="ExpiryDate" label="Expiry Date">
          <Text>{form.getFieldValue("ExpiryDate")}</Text>{" "}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCardModal;
