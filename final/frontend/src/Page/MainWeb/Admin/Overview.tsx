import React, { useEffect, useState } from 'react';
import './Overview.css'
import { Anchor, message, Modal } from 'antd';
import { AdminEvent } from './Admin';
import AdminStore from './AdminStore';
import AdminJob from './AdminJob';
import { MembershipInterface } from '../../../interfaces/StoreInterface';
import { GetMembership, UpdateMembership } from '../../../services/https';

const Overview: React.FC = () => {

    return (
        <>
            <div style={{ padding: '0 20px', position: 'sticky', top: '110px' }}>
                <Anchor
                    direction="horizontal"
                    items={[
                        {
                            key: 'part-1',
                            href: '#part-1',
                            title: 'Store',
                        },
                        {
                            key: 'part-2',
                            href: '#part-2',
                            title: 'Job',
                        },
                        {
                            key: 'part-3',
                            href: '#part-3',
                            title: 'Event',
                        },
                        {
                            key: 'part-4',
                            href: '#part-4',
                            title: 'ManagePayment',
                        },
                    ]}
                />
            </div>
            <div>
                <div id="part-1" style={{ overflowY: 'scroll', height: '700px' }}><AdminStore /></div>
                <div id="part-2" style={{ margin: '20% 0' }}><AdminJob /></div>
                <div id="part-3" style={{ overflowY: 'scroll', height: '700px', margin: '20% 0' }}><AdminEvent /></div>
                <div id="part-4"><ManagePayment /></div>
            </div>
        </>
    );
};

export default Overview;












export const ManagePayment: React.FC = () => {
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchMembership();
        }
    }, [userIdstr]);
    const [Membership, setMembership] = useState<MembershipInterface[]>([]);
    const fetchMembership = async () => {
        try {
            const res = await GetMembership();
            if (res.status === 200) {
                setMembership(res.data);
                console.log(res.data);
            } else {
                setMembership([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    //UpdateMembership

    const [PackageEdit, setPackageEdit] = useState({
        ID: 0,
        PackageName: '',
        Day: '',
        Pwa: '',
        Pea: '',
        RentalFee: '',
    });
    const handleChangeEdit = (e: any) => {
        const { name, value } = e.target;
        setPackageEdit({ ...PackageEdit, [name]: value });
        // message.success(name,value);
    };



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (value: MembershipInterface) => {
        setPackageEdit({
            ...PackageEdit,
            ID: Number(value.ID),
            PackageName: String(value.PackageName),
            Day: String(value.Day),
            Pwa: String(value.Pea),
            Pea: String(value.Pea),
            RentalFee: String(value.RentalFee)
        });
        setIsModalOpen(true);
    };

    const handleOk = async (e:any) => {
        e.preventDefault();
        const values: MembershipInterface = {
            PackageName:    PackageEdit.PackageName,
            Day:            Number(PackageEdit.Day),
            Pwa:            Number(PackageEdit.Pwa),
            Pea:            Number(PackageEdit.Pea),
            RentalFee:      Number(PackageEdit.RentalFee),
        };
        try {
            const res = await UpdateMembership(String(PackageEdit.ID),values);
            if (res.status === 200) {
                message.success('Edit package successfully!');
                await fetchMembership();
            } else {console.log("error!");}
        } catch (error) { console.log("error!");}
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            <h1 className='promotion'>Edit promotion</h1>
            <div className='Cpayment'>
                {Membership.length > 0 ? (
                    Membership.map((data, index) => (
                        <span key={index} className='PackagePayment' onClick={() => showModal(data)}>
                            <div className='Hpro'>{data.PackageName}</div>
                            <p className='Hpro' style={{ fontSize: '40px', fontWeight: '900' }}>{data.Day} Days</p>
                            <p style={{ fontSize: '20px' }}>- PWA {(data.Pwa || 'No data').toLocaleString()} Bath</p>
                            <p style={{ fontSize: '20px' }}>- PEA  {(data.Pea || 'No data').toLocaleString()} Bath</p>
                            <p style={{ fontSize: '20px' }}>- Rent  {(data.RentalFee || 'No data').toLocaleString()} Bath</p>
                            <div>Edit this promotion</div>
                        </span>
                    ))
                ) : (
                    <>
                        <div style={{ margin: '0 auto' }}>
                            <img src="https://media.tenor.com/lVhFnY9tc94AAAAi/anime-dance.gif" alt="anime gif" width={250} />
                            <div style={{ textAlign: 'center', width: '100%' }}>Loading . . .</div>
                        </div>
                    </>
                )}
            </div>
            <Modal title="Edit Package"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: '#B0946F', borderColor: '#B0946F', color: '#fff' } }}
                cancelButtonProps={{ style: { backgroundColor: '#fff', borderColor: '#B0946F', color: '#B0946F' } }}
                className='packageselect'
            >
                <p style={{ fontSize: '30px', margin: '0' }}>Package {PackageEdit.PackageName} </p>
                <div>
                    <label>Set Name package</label>
                    <input
                        type="text"
                        style={{ width: '100%' }}
                        id="PackageName"
                        name="PackageName"
                        placeholder="PackageName"
                        value={PackageEdit.PackageName}
                        onChange={handleChangeEdit}
                    />
                </div>
                <div>
                    <label>Set Day</label>
                    <input
                        type="Number"
                        prefix='฿'
                        style={{ width: '100%' }}
                        id="Day"
                        name="Day"
                        placeholder="Day"
                        value={PackageEdit.Day}
                        onChange={handleChangeEdit}
                    />
                </div>
                <div>
                    <label>Set Provincial Waterworks Authority</label>
                    <input
                        type="Number"
                        prefix='฿'
                        style={{ width: '100%' }}
                        id="Pwa"
                        name="Pwa"
                        placeholder="Pwa"
                        value={PackageEdit.Pwa}
                        onChange={handleChangeEdit}
                    />
                </div>
                <div>
                    <label>Set Provincial Electricity Authority</label>
                    <input
                        type="Number"
                        prefix='฿'
                        style={{ width: '100%' }}
                        id="Pea"
                        name="Pea"
                        placeholder="Pea"
                        value={PackageEdit.Pea}
                        onChange={handleChangeEdit}
                    />
                </div>
                <div>
                    <label>Set RentalFee</label>
                    <input
                        type="Number"
                        prefix='฿'
                        style={{ width: '100%' }}
                        id="RentalFee"
                        name="RentalFee"
                        placeholder="RentalFee"
                        value={PackageEdit.RentalFee}
                        onChange={handleChangeEdit}
                    />
                </div>
            </Modal>
        </>
    );
};