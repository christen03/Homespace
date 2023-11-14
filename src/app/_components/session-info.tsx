import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {type Session} from "next-auth"

export default function SessionInfo() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSession().then(session => {
            setSession(session);
            setLoading(false);
        }).catch(err => {
        console.log(err);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const firstName = session?.user?.name?.split(" ")[0] ?? "";

    return (
        <div className="align-center mt-2 w-full justify-center">
            <h1 className="text-center text-2xl font-medium">
                Welcome to{" "}
                <span className="font-bold leading-normal text-teal-600">
                    Lynkpad
                </span>
                {session && `, ${firstName}`}! Here are some listings for you to
                find your next home:
            </h1>
        </div>
    );
}
