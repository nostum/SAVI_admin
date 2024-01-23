// components/NotificationForm.js
import React, { useState } from "react";

const notificationTypes = [
    "inactiveUsers",
    "userWithoutProducts",
    "userWithoutClients",
    "userWithoutProviders",
];
/**
 * Renders a form for creating and sending notifications.
 *
 * @param {any} props - the component props
 * @return {JSX.Element} the rendered form component
 */
const NotificationForm = (props: any) => {
    const [notificationType, setNotificationType] = useState(
        notificationTypes[0],
    );
    const notificationResponseInitialState = {
        failedTokens: [],
        validTokens: [],
        message: {
            code: "",
            message: "",
        },
        status: "200",
    };

    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationBody, setNotificationBody] = useState("");
    const [notificationResponse, setNotificationResponse] = useState(
        notificationResponseInitialState,
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch("/api/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //use supabase auth
                    Authorization: `Bearer ${props.session?.access_token}`,
                },
                body: JSON.stringify({
                    notificationType: notificationType,
                    message: {
                        title: notificationTitle,
                        body: notificationBody,
                    },
                }),
            });
            //log data from response
            const data = await response.json();
            if (data.status !== 200) {
                setNotificationResponse(data);
                setLoading(false);
                return;
            }
            setNotificationResponse(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mx-auto  p-4">
            <form className=" mx-auto max-w-md space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Notification type
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="mt-1 w-full rounded-md border p-2"
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                    >
                        {notificationTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 w-full rounded-md border p-2"
                        onChange={(e) => setNotificationTitle(e.target.value)}
                        value={notificationTitle}
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        required
                        rows={4}
                        className="mt-1 w-full rounded-md border p-2"
                        placeholder="Enter body"
                        onChange={(e) => setNotificationBody(e.target.value)}
                        value={notificationBody}
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className={`${loading
                                ? "bg-gray-500  hover:bg-gray-600 focus:ring"
                                : "bg-black hover:bg-stone-950 focus:ring"
                            } disabled:bg-gray-500}bg-blue-500 rounded-md px-4 px-4 py-2 py-2 text-white text-white focus:outline-none focus:outline-none focus:ring focus:ring  focus:ring-gray-200`}
                    >
                        {loading ? "Sending Notification..." : "Send Notification"}
                    </button>
                </div>
            </form>
            <br />
            {notificationResponse.validTokens?.length > 0 && (
                <div
                    className=" mx-auto max-w-2xl border-l-4 border-green-500 bg-green-100 p-4 text-green-700"
                    role="alert"
                >
                    <p className="font-bold">
                        Notification successfully sent to{" "}
                        {notificationResponse.validTokens.length} valid{" "}
                        {notificationResponse.validTokens.length > 1 ? "tokens" : "token"}
                    </p>
                    {notificationResponse.validTokens.map((token) => (
                        <li
                            key={token}
                            className="max-w-2xl overflow-hidden truncate text-ellipsis whitespace-nowrap"
                        >
                            {token}
                        </li>
                    ))}
                </div>
            )}

            {notificationResponse.status != "200" && (
                <div
                    className="mx-auto max-w-2xl border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
                    role="alert"
                >
                    <p className="font-bold">{notificationResponse?.message.message}</p>
                </div>
            )}
        </div>
    );
};

export default NotificationForm;
