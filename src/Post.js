import { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const [twit, setTwit] = useState("");
  const [post, setPost] = useState([]);
  let data = {
    twit: twit,
  };
  const PostTwit = () => {
    axios.post(`https://twiteeex.herokuapp.com/v1/posts`, data, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`https://twiteeex.herokuapp.com/v1/posts`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setPost(res.data.data);
      });
  }, [twit]);

  const RemovePost = (id) => {
    axios.delete(`https://twiteeex.herokuapp.com/v1/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    window.location.reload();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          paddingTop: 30,
          marginLeft: "2rem",
        }}
      >
        <input
          placeholder="Type a post..."
          className="post_inp"
          onChange={(e) => setTwit(e.target.value)}
        />
        <br />
        <button className="post_but" onClick={PostTwit}>
          Post Twit
        </button>
      </div>
      <div
        style={{
          width: "70%",
          height: 500,
          marginTop: "3rem",
          marginLeft: "2rem",
          overflowY: "scroll",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Nos</th>
              <th>Name</th>
              <th>Post</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {post.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.post_data}</td>
                  <td>
                    {item.name === localStorage.getItem("name") ? (
                      <button onClick={() => RemovePost(item.twit_id)}>
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Post;
