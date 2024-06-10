import { useEffect, useState } from "react";
import { Catalog } from "../Entities/Catalog";
import AlertComponent from "../Alert-Component";
import { Directriz, GrupoDirectrices } from "../Entities/Directrices";
import { Modal, Table, message } from "antd";
import { Catalog_for_list } from "./catalogs";
import { getDirectricesByGrupoDirectrices, getGrupoDirectricesByCatalogo } from "../../connections/catalogs-connection";

interface DirectricesProps {
    grupoDirectrices: GrupoDirectrices;
    directrices: Directriz[];
}

const CatalogInfo: React.FC< {catalog: Catalog_for_list} > = ({catalog}) => {
    const [grupoDirectrices, setGrupoDirectrices] = useState<DirectricesProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gd = await getGrupoDirectricesByCatalogo(catalog.id);
                const result = await Promise.all(gd.map(async (gDirectriz) => {
                    const directrices = await getDirectricesByGrupoDirectrices(gDirectriz.id as number);
                    // Convertir peso a string
                    directrices.forEach((directriz) => {
                        directriz.peso = directriz.peso.toString();
                    });
                    return {
                        grupoDirectrices: gDirectriz,
                        directrices: directrices,
                    };
                }));
                setGrupoDirectrices(result);
            } catch (error: any) {
                message.error('Loading guidelines failed');
            }
        }
        fetchData();
    }, [catalog]);

    const columns = [
        {
            title: 'Id',
                dataIndex: 'eid',
            key: 'eid',
        },
        {
            title: 'Name',
            dataIndex: 'nombre',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'descripcion',
            key: 'description',
        },
        {
            title: 'Priority',
            dataIndex: 'peso',
            key: 'priority',
        },
    ];

    const renderDirectricesTables = () => {
        if (catalog && grupoDirectrices) {
            return grupoDirectrices.map((grupoDirectrices) => (
                <div key={grupoDirectrices.grupoDirectrices.id} >
                    <h3>{grupoDirectrices.grupoDirectrices.nombre}</h3>
                    <Table columns={columns} dataSource={grupoDirectrices.directrices} rowKey='id' pagination={false}/>
                </div>
            ));
        }
        return null;
    };

    return (
        <div>
            <h1>Catalog: {catalog.name}</h1>
            <p>- Score scale: {catalog.scoreScale}</p>
            <p>- Creator: {catalog.creator}</p>
            <p>- Group: {catalog.auditorsGroup}</p>
            <p>- Read Permission: {catalog.read}</p>
            <p>- Write Permission: {catalog.write}</p>
            <h2>Guidelines</h2>
            {renderDirectricesTables()}
        </div>
    );
};

export default CatalogInfo;