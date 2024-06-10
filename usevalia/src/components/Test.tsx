import { useState } from "react";
import { connect } from "react-redux";


const Test: React.FC<{user: any}> = ({user}) => {
    const [nombre, setNombre] = useState('SIIIUU');
    console.log(user);
return <div>wenas tardes: {user.nombre}</div>

};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps) (Test);