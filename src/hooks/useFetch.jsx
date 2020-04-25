import { useState, useLayoutEffect } from 'react'

export default (url) => {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          // 'Content-Type': 'application/json'
        }
      });
      setData(await response.json())
    }
    fetchData()
  }, [url])

  return {
    data, setData
  }
}