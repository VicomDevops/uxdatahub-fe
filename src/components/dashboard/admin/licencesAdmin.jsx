//REACT IMPORT
import React, { useState } from 'react'
//LIBRARY IMPORT
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from 'antd';
import { Col } from 'reactstrap'
//COMPONENTS IMPORT
import RightSideAdmin from "./RightSideAdmin";
//STYLES IMPORT
import './dashboardAdmin.css'




const originData = [
  {
    key: 1,
    name: 'Licence 0',
    type: 'Pay As You Go',
    abonnement: "N/A",
    prix_user: "50€",
    prix_test_modéré: "150€",
    prix_panel_client: "N/A",
    fonctionnalités: {
      AB_Testing : 1,
      unique : 0,
      modere : 0,
      non_modere : 0,
    },
  },
  {
    key: 2,
    name: 'Licence 1',
    type: 'Starter',
    abonnement: "1550€",
    prix_user: "22€",
    prix_test_modéré: "66€",
    prix_panel_client: "5€",
    fonctionnalités: {
      AB_Testing : 1,
      unique : 1,
      modere : 0,
      non_modere : 0,
    },
  },
  {
    key: 3,
    name: 'Licence 2',
    type: 'Premium',
    abonnement: "2950€",
    prix_user: "20€",
    prix_test_modéré: "60€",
    prix_panel_client: "5€",
    fonctionnalités: {
      AB_Testing : 1,
      unique : 0,
      modere : 1,
      non_modere : 0,
    },
  },
  {
    key: 4,
    name: 'Licence 3',
    type: 'Full Access',
    abonnement: "3110€",
    prix_user	: "12€",
    prix_test_modéré	: "36€",
    prix_panel_client	: "5€",
    fonctionnalités: {
      AB_Testing : 1,
      unique : 1,
      modere : 1,
      non_modere : 1,
    },
  },
]




const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {

  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Champ obligatoire`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


export const LicencesAdmin = () => {
/* ---------------------------------- HOOKS --------------------------------- */
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

/* ----------------------------- RENDER HELPERS ----------------------------- */
/**
 * isEditing - Check if the record is being edited
 * @param {object} record - The record to check
 */
const isEditing = (record) => record.key === editingKey;

/**
 * edit - Edit the record
 * @param {object} record - The record to edit
 */
    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        type: '',
        abonnement: "",
        prix_user	: "",
        prix_test_modéré	: "",
        prix_panel_client	: "",
        AB_Testing : "",
        unique : "",
        modere : "",
        non_modere : "",
        ...record,
      });
      setEditingKey(record.key);
    };

    /**
     * cancel - Cancel the edition
     */
    const cancel = () => {
      setEditingKey('');
    };

    /**
     * save - Save the record
     * @param {string} key - The key of the record to save
     */
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    /**
     * dataSource - The data of the table
     * @type {array} - The data of the table
     */
    const FAKE_DATA = originData?.map((data,index)=>({
        key: index,
        name: data?.name,
        type: data?.type,
        abonnement: data?.abonnement,
        prix_user: data?.prix_user,
        prix_test_modéré: data?.prix_test_modéré,
        prix_panel_client: data?.prix_panel_client,
        AB_Testing: data?.fonctionnalités?.AB_Testing,
        unique: data?.fonctionnalités?.unique,
        modere: data?.fonctionnalités?.modere,
        non_modere: data?.fonctionnalités?.non_modere,
    }));

    /**
     * columns - The columns of the table
     * @type {array} - The columns of the table
     */
    const columns = [
      {
        title: ' ',
        dataIndex: 'name',
        width: '10',
        editable: true,
        fixed: 'left',
      },
      {
        title: 'Nom',
        dataIndex: 'type',
        width: '20',
        editable: true,
        fixed: 'left',
      },
      {
        title: 'Abonnement',
        dataIndex: 'abonnement',
        width: '20',
        editable: true,
      },
      {
        title: 'Prix user',
        dataIndex: 'prix_user',
        width: '20',
        editable: true,
      },
      {
        title: 'Prix test modéré',
        dataIndex: 'prix_test_modéré',
        width: '20',
        editable: true,
      },
      {
        title: 'Prix panel client',
        dataIndex: 'prix_panel_client',
        width: '20',
        editable: true,
      },
      {
        title: 'AB Testing',
        dataIndex: 'AB_Testing',
        width: '20',
        editable: true,
      },
      {
        title: 'Unique',
        dataIndex: 'unique',
        width: '20',
        editable: true,
      },
      {
        title: 'Modéré',
        dataIndex: 'modere',
        width: '20',
        editable: true,
      },
      {
        title: 'Non modéré',
        dataIndex: 'non_modere',
        width: '20',
        editable: true,
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        fixed: 'right',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8 }}>
                Save
              </Typography.Link>
              <Popconfirm title="Vous êtes sûr d'annuler ?" onConfirm={cancel}>
                <p>Annuler</p>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Modifier
            </Typography.Link>
          );
        },
      },
    ];

/**
 * mergedColumns 
 * @type {array} - The columns of the table with the editable cells
 */
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'modegre' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });


  /**
   *  UI Component
   */
  return (
    <>
      <div className='display__flex__row-admin'>
        <Col md='10'>
        <h1 className='db__title-admin_Licence'>Gestion licences</h1>
          <Form form={form} component={false}>
            <Table
              rowKey={(record) => record.uid}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={FAKE_DATA}
              pagination={{ position: ['none', 'none'] }}
              columns={mergedColumns}
              scroll={{ x: 1450, y: 1000 }}
            />
          </Form>
        </Col>
        <RightSideAdmin/>
      </div>
    </>
  )
}

//export default LicencesAdmin