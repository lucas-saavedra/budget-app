
import { useQuery } from "@tanstack/react-query";
import { MdSearch, MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Account from "../components/Account";
import axios from "axios";

import { useEffect, useState } from "react";





const Accounts = () => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then()
    }, [])

    const { isFetching, error, data } = useQuery(['accounts'], async () => (
        axios.get("http://127.0.0.1:8000/api/accounts", {
            headers: { Authorization: 'Bearer ' + '1|II0bruH55BdZpFQErqzZ1pumgaoRrdkcrHoN850V' }
        }).then(res => res.data.data)
    ))

    useEffect(() => {
        if (data) {
            setTotal(data.map(account => account.initial_balance).reduce((acc, current) => acc + current, 0));
        }
    }, [data])

    return (

        <div className="container-fluid" >
            {isFetching ? (<>Loading...</>) :
                (
                    <>
                        <div className="alert alert-primary my-1" role="alert">
                            <div className="row">
                                <div className="h3 col text-center"> Total amount: {total}$</div>
                                <div className="col d-flex justify-content-end">
                                    <MdSearch fontSize={25} />
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {data.map((account, key) => {
                                return (
                                    <div className="col" key={key}>
                                        < Account
                                            type={account.type}
                                            id={account.id}
                                            description={account.description}
                                            name={account.name}
                                            initial_balance={account.initial_balance}
                                            color={account.color}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
        </div>

    )
}

export default Accounts