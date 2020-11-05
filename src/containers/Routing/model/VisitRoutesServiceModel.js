
export function VisitRoutesServiceModel(routes) {
    const visits = []
    Object.values(routes).map((route) =>
        {
           route.visits.map((visit)=>{
                visits.push({
                    routeId: route.getId(),
                    visitId:visit.id,
                })
           })
            
        }
    )
    return visits
}


