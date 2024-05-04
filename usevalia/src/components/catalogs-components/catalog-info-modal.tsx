import { useEffect, useState } from "react";
import { Catalog } from "../Entities/Catalog";
import AlertComponent from "../Alert-Component";
import { Directriz, GrupoDirectrices } from "../Entities/Directrices";
import { Modal, Table } from "antd";
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
                let gd: GrupoDirectrices[] = [];
                let directrices: Directriz[] = [];
                let result : DirectricesProps[] = [];
                gd = await getGrupoDirectricesByCatalogo(catalog.id);
                gd.forEach(async (gDirectriz) => {
                    directrices = await getDirectricesByGrupoDirectrices(gDirectriz.id as number);
                    directrices.forEach((directriz) => {
                        directriz.peso = directriz.peso.toString();
                    });
                    result.push({
                        grupoDirectrices: gDirectriz,
                        directrices: directrices,
                    });
                });
                setGrupoDirectrices(result);
            } catch (error: any) {
                AlertComponent(error.message);
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
                <h2 key={grupoDirectrices.grupoDirectrices.id}>
                    <h3>{grupoDirectrices.grupoDirectrices.nombre}</h3>
                    <Table columns={columns} dataSource={grupoDirectrices.directrices} />
                </h2>
            ));
        }
        return null;
    };

    return (
        <Modal title= "Catalog info" footer={null}>
            <h1>Catalog: {catalog.name}</h1>
            <p>- Score scale: {catalog.scoreScale}</p>
            <p>- Creator: {catalog.creator}</p>
            <p>- Group: {catalog.auditorsGroup}</p>
            <p>- Read Permission: {catalog.read}</p>
            <p>- Write Permission: {catalog.write}</p>
            <h2>Guidelines</h2>
            {renderDirectricesTables()}
        </Modal>
    );
};

export default CatalogInfo;