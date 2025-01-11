import {
    RouterProvider
} from '@tanstack/react-router'
import router from "./pages/contacts/router.tsx";

function App() {
  return (
      <div className="app">
          <RouterProvider router={router} />
      </div>
  )
}

export default App
