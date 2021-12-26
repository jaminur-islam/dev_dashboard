import { Button } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
const TestTable2 = () => {
    const [data, setData] = useState([])
    const columns = [
      { title: "ID", field: "id" },
      { title: "Reference", field: "Reference" },
      { title: "NewClient", field: "NewClient" },
      { title: "Price", field: "Price" },
      { title: "Payment", field: "Payment" },
      { title: "Status", field: 'Status' }
    ]
    useEffect(() => {
      fetch("https://animfahad32.github.io/fakeData/FakeClothingData.json")
        .then(resp => resp.json())
        .then(resp => {
          setData(resp)
        })
    }, [])
  
    return (
      <div className="App">
        <MaterialTable
          title="Orders(7)"
          initialPage={5}
          data={data}
          columns={columns}
        >
            <Button>Hiiii</Button>
        </MaterialTable>
      </div>
    );
};

export default TestTable2;