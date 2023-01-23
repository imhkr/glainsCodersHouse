import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import Loader from "../../components/shared/Loader/Loader";
const CPCalendar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchContest = async () => {
    try {
      const res = await fetch(
        `https://clist.by/api/v2/contest/?username=himanshu_patel&api_key=4b4f6080d7056ddf5b5559c6967edb89a6fd5bce&upcoming=true&ongoing=true&format_time=true&order_by=resource_id&limit=100`
      );
      const result = await res.json();
      setData(result.objects);
    } catch (error) {
      console.log({ message: error.message });
    }
  };
  useEffect(async () => {
    await fetchContest();
    setLoading(false);
  }, []);

  if (loading) return <Loader message="Loading in progress..." />;

  return (
    <div>
      {data?.map((contest, i) => (
        <div>
          <Table
            key={i}
            Event={contest.event}
            Start={contest.start}
            End={contest.end}
            Duration={contest.duration}
            Id={contest.id}
            Link={contest.href}
          />
        </div>
      ))}
    </div>
  );
};

export default CPCalendar;
