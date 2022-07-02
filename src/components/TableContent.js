import React from "react";

function TableContent(props) {
    return (
        Array.from(props.forecast).map((item, i) => (
            <tr key={i}>
                <td>{item.dt}</td>
                <td>{item.temp}</td>
                <td>{item.pressure}</td>
                <td>{item.humidity}</td>
            </tr>
        )
        )
    )
}

export default TableContent;