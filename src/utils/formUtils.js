import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/produto';

export const criar = async (objeto) => axios.post(API, objeto);

export const listar = async () => axios.get(API);

export const buscar_produto = async () => axios.get(`${API}/${id}`);

export const editar = async (id, objeto) => axios.put(`${API}/${id}`, objeto);

export const excluir = async (id) => axios.delete(`${API}/${id}`);

export function getInputDado(e, objeto, setObjeto) {
  setObjeto({ ...objeto, [e.target.id]: e.target.value });
}

