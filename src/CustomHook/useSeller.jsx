import { useQuery } from "@tanstack/react-query";


import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";


const useSeller = () => {
    const { user, loading } =useAuth() ;
    const axiosPrivate = useAxiosPrivate();
    const { data: isSeller =[], isPending: isSellerLoading } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        enabled: !loading,
        queryFn: async () => {
            
            const res = await axiosPrivate.get(`/users/seller/${user.email}`);
          
            return res.data?.seller;
        }
    })
    return [isSeller, isSellerLoading]
};

export default useSeller;

