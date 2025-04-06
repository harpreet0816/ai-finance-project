const { useState } = require("react");
const { toast } = require("sonner");

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            if ('success' in response) {
                if (response.success) {
                  setData(response.data);
                  setError(null);
                } else {
                    throw new Error(response?.data || "Something went wrong");
                }
              }else{
                  setData(response?.data);
                  setError(null);
              }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {data, loading, error, fn , setData}
}

export default useFetch;