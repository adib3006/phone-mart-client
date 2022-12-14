import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://phone-mart-server.vercel.app/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data[0].role === "seller") {
                        setIsSeller(true);
                        setIsSellerLoading(false);
                    }
                })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}

export default useSeller;