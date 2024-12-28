import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { StoreInterface,  } from "./../../../../../interfaces/StoreInterface";
import {
    ParkingCardInterface,
    ParkingFeePolicyInterface,
  } from "./../../../../../interfaces/Carpark";

const AddCardModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onAddCard: (data: any) => void;
  getParkingCards: () => Promise<void>
}> = ({ visible, onCancel, onAddCard, getParkingCards }) => {
  const [form] = Form.useForm();
  const [typeParkOptions, setTypeParkOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState<StoreInterface[]>([]); // กำหนดประเภทของ storeOptions

  useEffect(() => {
    getParkingCards();
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // สร้าง ParkingCard ใหม่
        const newCardData = {
          ...values,
          ExpiryDate:
            values.TypePark === "Store"
              ? getStoreExpiryDate(values.StoreID)
              : "lifetime",
        };
        onAddCard(newCardData);
        form.resetFields();
        message.success("Parking card added successfully!");
      })
      .catch((error) => {
        message.error("Failed to add parking card.");
      });
  };

  const getStoreExpiryDate = (storeID: string) => {
    // ดึงข้อมูล ExpiryDate ของ Store
    const store = storeOptions.find((store) => store.ID === Number(storeID)); // ใช้ store.ID เพื่อค้นหา
    return store ? store.LastDay : ""; // ใช้ store.LastDay เพื่อกำหนด ExpiryDate
  };

  return (
    <Modal
      title="Add Parking Card"
      visible={visible}
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
      <Form form={form} layout="vertical">
        <Form.Item
          name="ID"
          label="Card ID"
          rules={[{ required: true, message: "Please input the card ID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TypePark"
          label="Card Type"
          rules={[{ required: true, message: "Please input the card type!" }]}
        >
          <Select options={typeParkOptions} />
        </Form.Item>
        <Form.Item
          name="StoreID"
          label="Store"
          rules={[{ required: true, message: "Please select a store!" }]}
        >
          <Select
            options={storeOptions.map((store) => ({
              label: store.NameStore,
              value: store.ID,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="ExpiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: "Please input the expiry date!" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCardModal;
