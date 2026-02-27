import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

function Unauthorized() {
    const { role } = useUser();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card bg-base-100 shadow-xl w-full max-w-lg">
                <div className="card-body items-center text-center py-16 px-10">
                    {/* Icon */}
                    <div className="bg-error/10 rounded-full p-5 mb-4">
                        <ShieldExclamationIcon className="h-14 w-14 text-error" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-base-content mb-2">
                        Access Denied
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base-content/60 text-sm mb-4">
                        You do not have permission to view this page.
                    </p>

                    {/* Role badge */}
                    {role && (
                        <div className="badge badge-outline badge-lg mb-6 text-xs tracking-wide">
                            Your role:{" "}
                            <span className="font-bold ml-1 text-primary">{role}</span>
                        </div>
                    )}

                    <div className="divider my-0" />

                    {/* CTA */}
                    <p className="text-sm text-base-content/50 mt-4 mb-6">
                        Please contact your administrator if you believe this is a mistake.
                    </p>

                    <Link to="/app/dashboard" className="btn btn-primary w-full">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
