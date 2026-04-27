tareas= [
{"Tarea1":"hecer lo primero del dia"},
{"Tarea2":"hecer lo segundo del dia"}
]
tareasString= JSON.stringify(tareas)
localStorage.setItem("tareas", tareasString)
tareasString=localStorage.getItem("tareas")
tareas = JSON.parse(tareas)
Modulo