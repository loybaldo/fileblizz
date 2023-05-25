import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Button from "../../common/button";
import "./status.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/auth-provider";
import { useContext, useEffect } from "react";


function Status() {

    const {totalUsedStorage, memberships} = useContext(AuthContext);

    const history = useNavigate();
    let handleClick = () => {
        history('/premium');
    };

    const formatFileSize = (size: number) => {
        const CONVERSION_UNIT = 1024;
        const kilobytes = size / CONVERSION_UNIT;
        const megabytes = kilobytes / CONVERSION_UNIT;
        const gigabytes = megabytes / CONVERSION_UNIT;

        if (kilobytes < CONVERSION_UNIT) { return `${kilobytes % 1 === 0 ? kilobytes : kilobytes.toFixed(kilobytes < 10 ? 1 : 0)} KB` }
        if (megabytes < CONVERSION_UNIT) { return `${megabytes % 1 === 0 ? megabytes : megabytes.toFixed(megabytes < 10 ? 1 : 0)} MB` }
        return `${gigabytes.toFixed(1)} GB`;
    }

    const handleStoragePercent = (): number => {
        // calculate the percentage
        if (memberships.length <= 0) {
            // Total storage is 100MB
            return (totalUsedStorage / 1000000) * 100; // Changed division by 100000000 to 1000000
        }
        if (memberships[0].type === "pro") {
            // Total storage is 3GB
            return (totalUsedStorage / 3000000000) * 100; // Changed division by 100000000 to 3000000000
        }
        if (memberships[0].type === "premium") {
            // Total storage is 18GB
            return (totalUsedStorage / 18000000000) * 100; // Changed division by 100000000 to 18000000000
        }
        return 0;
    }

    const color = handleStoragePercent();
    

    const handleStorage = (): string => {
        if (memberships.length <= 0) {
            return "100MB"
        }
        if (memberships[0].type == "pro") {
            return "3GB";
        }
        if (memberships[0].type == "premium") {
            return "10GB";
        }
        return "";
    }

    useEffect(() => {
        console.log(memberships)
    })

    return (
        <>
            <div className="f-status">
                <div className="f-card">
                    <div>
                        <span>Storage</span>
                        <CircularProgressbar
                            value={color}
                            text={`${Math.ceil(handleStoragePercent())}%`}
                            styles={
                                {
                                    root: {},
                                    path: {
                                        strokeLinecap: 'round',
                                        // transition: 'stroke-dashoffset 0.5s ease 0s'
                                    },
                                    trail: {
                                        strokeLinecap: 'butt',
                                    },
                                    text: {
                                        fontSize: '16px',
                                    },
                                }
                            } />
                    </div>
                    <div>
                        <span>Total: {handleStorage()}</span>
                        <span>Used: {formatFileSize(totalUsedStorage)}</span>
                    </div>
                </div>

                <div className="f-card">
                    <i className="fa-regular fa-crown" style={{ fontSize: 24 }}></i>
                    <p>Running out of storage?</p>
                    <p>Click the button below to check our premium plan.</p>
                    <Button onclick={handleClick} classItem={"primary"} > Go Premium </Button>
                </div>
            </div>
        </>
    );
}

export default Status;