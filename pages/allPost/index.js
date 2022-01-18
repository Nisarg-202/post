import axios from "axios";
import { useEffect } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

export default function AllPost() {
  useEffect(function () {
    async function checkAuth() {
      const token = sessionStorage.getItem("TOKEN");
      const response = await axios.post("/api/checkAuth", { token });
      if (!response.data.condition) {
        window.location.href = "/";
      }
    }

    checkAuth();
  }, []);
  return (
    <div>
      <Navbar />
      <Card size={3} />
    </div>
  );
}
