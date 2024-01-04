import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const url = "https://api.github.com/users";

const App = () => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      {console.log("--------------->")}

      <div className="flex flex-col justify-center items-center  bg-gray-600">
        <Typography variant="h1" color="white">
          Git users
        </Typography>
        <Typography variant="paragraph" color="white">
          API de users - react-vite - material taildwind
        </Typography>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4  m-2">
          {user.map((item) => (
            <Card className=" w-80  sm:w-80 lg:w-96 " key={item.id}>
              <img
                src={item.avatar_url}
                alt={item.login}
                className="mx-auto mt-5 h-48 w-48 rounded-full object-cover object-center shadow-xl shadow-blue-gray-900/50"
              />
              <CardBody>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className=" text-center m-auto"
                >
                  {item.login}
                </Typography>
              </CardBody>

              <CardFooter className="pt-0">
                <Button
                  size="lg"
                  color="dark"
                  className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                  ripple={false}
                  fullWidth={true}
                >
                  Profile Github
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </div>

      {console.log("<---------------")}
    </React.Fragment>
  );
};

export default App;
