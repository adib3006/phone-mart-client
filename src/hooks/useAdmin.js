import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://phone-mart-server.vercel.app/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
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