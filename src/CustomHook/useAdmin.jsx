import { useQuery } from "@tanstack/react-query";


import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";


const useAdmin = () => {
    const { user, loading } =useAuth() ;
    const axiosPrivate = useAxiosPrivate();
    const { data: isAdmin =[], isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            
            const res = await axiosPrivate.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;