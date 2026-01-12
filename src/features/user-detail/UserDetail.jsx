import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import {
  FaArrowLeft,
  FaGithub,
  FaMapMarkerAlt,
  FaLink,
  FaUsers,
  FaBook,
} from "react-icons/fa";

/**
 * UserDetail Component
 * Displays detailed information about a specific GitHub user
 */
const UserDetail = () => {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${login}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Usuario no encontrado`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [login]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="h-12 w-12" color="green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-block mb-6">
          <Button
            variant="text"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
          >
            <FaArrowLeft /> Volver a la búsqueda
          </Button>
        </Link>
        <Card className="p-8 bg-red-50 dark:bg-red-900/20">
          <Typography
            variant="h4"
            className="text-red-600 dark:text-red-400 text-center"
          >
            {error}
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <Link to="/" className="inline-block mb-6">
        <Button
          variant="text"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FaArrowLeft /> Volver a la búsqueda
        </Button>
      </Link>

      <Card className="w-full bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          className="bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 m-0 p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-2xl shrink-0 border-4 border-white dark:border-gray-700">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col text-center md:text-left text-white">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                {user.name || user.login}
              </Typography>
              <Typography className="text-green-100 font-medium mb-1">
                @{user.login}
              </Typography>
              {user.bio && (
                <Typography className="text-green-50 mt-3 max-w-2xl">
                  {user.bio}
                </Typography>
              )}
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaBook className="mx-auto mb-2 text-2xl text-blue-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.public_repos}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Repositorios
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaUsers className="mx-auto mb-2 text-2xl text-green-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.followers}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Seguidores
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaUsers className="mx-auto mb-2 text-2xl text-purple-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.following}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Siguiendo
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaBook className="mx-auto mb-2 text-2xl text-amber-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.public_gists}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Gists
              </Typography>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 mb-6">
            {user.company && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaUsers className="text-gray-500 dark:text-gray-400" />
                <Typography>{user.company}</Typography>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                <Typography>{user.location}</Typography>
              </div>
            )}

            {user.blog && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaLink className="text-gray-500 dark:text-gray-400" />
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          {/* Action Button */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="lg"
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 w-full"
            >
              <FaGithub size={20} /> Ver Perfil Completo en GitHub
            </Button>
          </a>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetail;
