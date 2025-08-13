"use client";
import React from "react";
import { useEffect, useState } from "react";
import HighChartComponent from "./produtos/components/HighChartComponent";

export default function Dashboard() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3333/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <HighChartComponent />
    </>
  );
}
