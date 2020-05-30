const router = require('express').Router();

router.get('/', (req, res) => {
        res.send('<h1>Lista de tarefas</h1>');
    }
);

router.get('/:id', (req, res) => {
        res.send('<h1>Detalhes da tarefa $[req.params.id]</h1>');
    }
);

router.post('/', (req, res) => {
    res.send('<h1>Criar uma tarefa</h1>')
    }
)

router.put('/:id', (req, res) => {
        res.send('<h1>Editar a tarefa $[req.params.id]</h1>');
    }
);

router.delete('/:id', (req, res) => {
        res.send('<h1>Deletar uma tarefa $[req.params.id]</h1>')
    }
)

module.express = router; 