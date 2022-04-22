import { useState, useEffect } from "react";
export const DataTable = ({
  buttPrev,
  buttNext,
  data,
  current,
  count,
  totalItem,
}) => {
  const [itemCount, setItemCount] = useState(0);
  console.log(totalItem);
  const showlist = (elem) => {
    let list = [];
    for (let i = 0; i < elem; ++i) {
      list.push(i + 1);
    }

    return (
      <div>
        {list.map((elem) => {
          return (
            <span style={{ color: `${current === elem ? "blue" : "red"}` }}>
              {" "}
              &nbsp; {elem} &nbsp;
            </span>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    setItemCount(totalItem / 10);
  }, [totalItem]);
  return (
    <div className="tableDiv">
      <strong>Current page {current}</strong>
      <br />
      <br />
      <table>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Population</th>
          <th>Rotation_period</th>
          <th>Terrain</th>
          <th>Diameter</th>
          <th>Created</th>
        </tr>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.climate}</td>
                <td>{item.population}</td>
                <td>{item.rotation_period}</td>
                <td>{item.terrain}</td>
                <td>{item.diameter}</td>
                <td>
                  {new Date(item.created)
                    .toString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1rem",
          height: "30px",
        }}
      >
        <span onClick={buttPrev} style={{ cursor: "pointer" }}>
          &#8592; &nbsp; &nbsp;
        </span>
        {itemCount === 0 ? "" : showlist(itemCount)}

        <span onClick={buttNext} style={{ cursor: "pointer" }}>
          &nbsp; &nbsp; &#8594;
        </span>
      </div>
    </div>
  );
};
