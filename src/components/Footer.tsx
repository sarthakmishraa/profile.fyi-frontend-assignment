import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaUser, FaRegFileCode } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";

export const Footer = () => {
    return(
        <div className="border-t-2 pt-2 mt-8 font-semibold flex flex-row justify-between md:justify-evenly">
            <div className="text-2xl flex items-center">
                <p>Mintra - E Commerce</p>
            </div>
            <div>
                <p className="text-xl mb-2">About this task</p>
                <Link to="https://profile-fyi-frontend-assignment.vercel.app/" target="_blank">
                    <div className="flex flex-row items-center my-2">
                        <FaLink size={25} />
                        <p className="text-lg">Live</p>
                    </div>
                </Link>
                <Link to="https://github.com/sarthakmishraa/profile.fyi-frontend-assignment" target="_blank">
                    <div className="flex flex-row items-center">
                        <FaRegFileCode size={25} />
                        <p className="text-lg">Task Code</p>
                    </div>
                </Link>
            </div>
            <div>
                <p className="text-xl mb-2">About Me</p>
                <div className="grid grid-cols-2 gap-2">
                    <Link to="https://github.com/sarthakmishraa" target="_blank">
                        <FaGithub className="cursor-pointer" size={25} />
                    </Link>
                    <Link to="https://www.linkedin.com/in/sarthakmishraa/" target="_blank">
                        <FaLinkedin className="cursor-pointer" size={25} />
                    </Link>
                    <Link to="https://sarthakmishraa.github.io/portfolio/" target="_blank">
                        <FaUser className="cursor-pointer" size={25} />
                    </Link>
                    <Link to="https://twitter.com/sarthakmishra_4" target="_blank">
                        <BsTwitterX className="cursor-pointer" size={25} />
                    </Link>
                </div>
            </div>
        </div>
    )
}