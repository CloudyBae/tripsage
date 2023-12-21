import PlanForm from "./PlanForm"
function page() {

  return (
    <main className="flex relative h-screen flex-col items-center justify-start p-24">
      <h1>Your adventure awaits...</h1>
      <PlanForm />
    </main>
  )
}

export default page