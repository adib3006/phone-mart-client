import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data[0].role === "admin") {
                        setIsAdmin(true);
                        setIsAdminLoading(false);
                    }
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;