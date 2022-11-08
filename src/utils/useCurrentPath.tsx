import { matchRoutes, useLocation } from "react-router-dom"

const routes = [{ path: "/get-in" }, {path: "/"}]

export const useCurrentPath = () => {
  const location = useLocation()
  const route = matchRoutes(routes, location)

  return route ? route[0].pathname : ''
}