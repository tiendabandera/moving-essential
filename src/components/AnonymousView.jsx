import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const AnonymousView = ({ isOpen, onClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="flex flex-col gap-5 p-2 items-center lg:items-start lg:flex-row justify-between">
            <div className="flex flex-col items-center lg:pl-6 lg:mt-20 lg:items-start">
              <h3 className="text-xl font-semibold text-color-1">Welcome to</h3>
              <h1 className="bold-32">Moving Esstential</h1>
              <p className="text-gray-50 font-light mt-6">
                If you want to continue please
              </p>
              <p className="text-gray-50 font-light">Login or Sign up</p>
              <div className="flex gap-4 mt-6">
                <Link to="/login">
                  <Button className="bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-color-1 border border-color-1 rounded-lg hover:bg-transparent hover:text-color-1">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-[45%]">
              <img
                src="/assets/img/anonymous-view.png"
                alt="Welcome to Moving Essential"
                className="object-cover"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
