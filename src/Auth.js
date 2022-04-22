import { useState, useEffect } from "react";
import { SideBar } from "./Sidebar";
import { DataTable } from "./DataTable";
import axios from "axios";

const ProjectComp = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [totalItem, setTotalItem] = useState(null);

  let showCounter = [];
  useEffect(() => {
    axios.get(`https://swapi.dev/api/planets/?page=1`).then((res) => {
      //console.log(res?.data);
      setData(res?.data.results);
      setTotalItem(res.data.count);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/planets/?page=${current}`)
      .then((res) => {
        //console.log(res?.data.results);
        setData(res?.data.results);
      })
      .catch((error) => {
        console.warn(typeof error.message);
        if (error.message) {
          setCurrent(1);
        }
      });
  }, [current]);

  const handleCurrentPrev = () => {
    if (current > 1) {
      setCurrent(current - 1);
      showCounter.pop();
      setCount(showCounter);
    } else {
      setCurrent(1);
    }
  };

  const handleCurrentNext = () => {
    if (current > 0) {
      setCurrent(current + 1);
      showCounter.push(current);
      setCount(showCounter);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <DataTable
        buttPrev={handleCurrentPrev}
        buttNext={handleCurrentNext}
        data={data}
        current={current}
        count={count}
        totalItem={totalItem}
      />
    </div>
  );
};

export default ProjectComp;
