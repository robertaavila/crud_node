const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const Task = require('../models/tasks.js');

router.get('/', (req, res) => {
        res.send('<h1>Lista de tarefas</h1>');
    }
);

router.get('/:id', (req, res) => {
        res.send(`<h1>Detalhes da tarefa ${req.params.id}</h1>`);
    }
);

router.post('/', [
    check('name', 'Nome é campo obrigatório.')
        .trim()
        .escape()
        .notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Task.create({
            name: req.body.name,
            description: req.body.description
        }).then(task => {
            return res.json({
                data: [task]
            });
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.put('/:id', (req, res) => {
        res.send(`<h1>Editar a tarefa ${req.params.id}</h1>`);
    }
);

router.delete('/:id', (req, res) => {
        res.send(`<h1>Deletar uma tarefa ${req.params.id}</h1>`)
    }
)

module.exports = router;