import axios from "axios";

export const instance = axios.create(
    { baseURL: "http://localhost:8081/api.com/v2/" }
)

export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxMTA5NjYwNSwiZXhwIjoxNzExMTAwMjA1fQ.HA10H0x8wlb8WManeQEnbTcKxSswUR9X4XHGKeUOWJhtDmavQnKaCQ1HwbzUO9kWJ2HWuhD-B0tFPkIhokgtNQ"