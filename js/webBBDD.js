var db = window.openDatabase("localDB", "1.0", "localDB", 5 * 1024 * 1024);
createBBDD();
/*inserta los eventos*/
function insertEventos(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlImagen, "Takumba", "evento" + data[i].id)
        }

        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlImagen.substr(data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO evento (id, nombre, url_imagen, subtitulo, fecha_fin_oficial, fecha_inicio_oficial) ' +
                        'VALUES(?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, fp + "evento" + data[i].id + ext, data[i].subtitulo, data[i].fechaFin, data[i].fechaIni], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE evento SET nombre =?, url_imagen=?, subtitulo=?, fecha_fin_oficial=?, fecha_inicio_oficial=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, fp + "evento" + data[i].id + ext, data[i].subtitulo, data[i].fechaFin, data[i].fechaIni, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*inserta las etiquetas*/
function insertEtiquetas(data) {
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO etiqueta (id, nombre, color, evento_id) ' +
                        'VALUES(?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].color, sessionFiltroEvento], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE etiqueta SET nombre =?, color=?, evento_id=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].color, sessionFiltroEvento, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertParticipantes(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlImagen, "Takumba", "participante" + data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlImagen.substr(data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO participante (id, nombre, url_imagen, descripcion) ' +
                        'VALUES(?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, fp + "participante" + data[i].id + ext, data[i].descripcion], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE participante SET nombre =?, url_imagen=?, descripcion=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, fp + "participante" + data[i].id + ext, data[i].descripcion, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertTematicas(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlImagen, "Takumba", "tematica" + data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlImagen.substr(data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO tematica (id, nombre, url_imagen, color) ' +
                        'VALUES(?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, fp + "participante" + data[i].id + ext, data[i].color], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE tematica SET nombre =?, url_imagen=?, color=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, fp + "tematica" + data[i].id + ext, data[i].color, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertLugares(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlImagen, "Takumba", "lugar" + data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlImagen.substr(data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO lugar (id, nombre, url_imagen) ' +
                        'VALUES(?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, fp + "lugar" + data[i].id + ext], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE lugar SET nombre =?, url_imagen=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, fp + "lugar" + data[i].id + ext, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertPatrocinadores(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlLogotipo, "Takumba", "patrocinador" + data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlLogotipo.substr(data[i].urlLogotipo.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO patrocinador (id, categoria, nombre, url_destino, url_logotipo, idPat, idEve) ' +
                        'VALUES(?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id + 'eve' + sessionFiltroEvento, data[i].categoria, data[i].nombre, data[i].urlDestino, fp + "patrocinador" + data[i].id + ext, data[i].id, sessionFiltroEvento], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE patrocinador SET categoria =?, nombre=?, url_destino=?, url_logotipo=? WHERE id=? '
                tx.executeSql(consulta, [data[i].categoria, data[i].nombre, data[i].urlDestino, fp + "patrocinador" + data[i].id + ext, data[i].id + 'eve' + sessionFiltroEvento], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertBannersEvento(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            DownloadFile(data[i].urlImagen, "Takumba", "banner" + data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var ext = "." + data[i].urlImagen.substr(data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO banner (id, nombre, url_destino, url_imagen, idBan, idEve) ' +
                        'VALUES(?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id + 'eve' + sessionFiltroEvento, data[i].nombre, data[i].urlDestino, fp + "banner" + data[i].id + ext, data[i].id, sessionFiltroEvento], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE banner SET nombre=?, url_destino=?, url_imagen=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].urlDestino, fp + "banner" + data[i].id + ext, data[i].id + 'eve' + sessionFiltroEvento], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertNomenclaturaMenu(data) {
    try {
        db.transaction(function (tx) {
            if (data.favoritos) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["favoritos", data.favoritos], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.favoritos, "favoritos"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.tematicas) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["tematicas", data.tematicas], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.tematicas, "tematicas"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.lugares) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["lugares", data.lugares], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.lugares, "lugares"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.participantes) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["participantes", data.participantes], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.participantes, "participantes"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.cerca) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["cerca", data.cerca], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.cerca, "cerca"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.fecha) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["fecha", data.fecha], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.fecha, "fecha"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.etiquetas) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["etiquetas", data.etiquetas], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.etiquetas, "etiquetas"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.patrocinadores) {
                var consulta = 'INSERT INTO nomenclatura_menu (id, valor) ' +
                        'VALUES(?,?)'
                tx.executeSql(consulta, ["patrocinadores", data.patrocinadores], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET valor=? WHERE id=? '
                tx.executeSql(consulta, [data.patrocinadores, "patrocinadores"], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertActividades(data) {
    try {
        for (var i = 0; i < data.data.length; i++) {
            DownloadFile(data.data[i].urlImagen, "Takumba", "actividad" + data.data[i].id)
        }
        db.transaction(function (tx) {
            for (var i = 0; i < data.data.length; i++) {
                var ext = "." + data.data[i].urlImagen.substr(data.data[i].urlImagen.lastIndexOf('.') + 1);
                var fp = getData('root')
                var consulta = 'INSERT INTO actividad (id, nombre, url_imagen, entradilla, fecha_inicio_oficial, hora_inicio_oficial, hora_fin_oficial, fecha_fin_oficial, lugar_id, nombreLugar, long, lat) ' +
                        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [data.data[i].id, data.data[i].nombre, fp + "actividad" + data.data[i].id + ext, data.data[i].entradilla, new Date(new Date(data.data[i].fechaInicioOficial).getTime()).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(new Date(data.data[i].fechaFinOficial).getTime()).getTime(), sessionFiltroLugar, data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                if (sessionFiltroLugar != -1) {
                    var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, lugar_id=?, nombreLugar=?, long=?, lat=? WHERE id=? '
                    tx.executeSql(consulta, [data.data[i].nombre, fp + "actividad" + data.data[i].id + ext, data.data[i].entradilla, new Date(data.data[i].fechaInicioOficial).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(data.data[i].fechaFinOficial).getTime(), sessionFiltroLugar, data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud, data.data[i].id], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                } else {
                    var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, nombreLugar=?, long=?, lat=? WHERE id=? '
                    tx.executeSql(consulta, [data.data[i].nombre, fp + "actividad" + data.data[i].id + ext, data.data[i].entradilla, new Date(data.data[i].fechaInicioOficial).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(data.data[i].fechaFinOficial).getTime(), data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud, data.data[i].id], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }

                if (sessionFiltroEvento != -1) {
                    var consulta = 'INSERT INTO actividad_evento (id, actividad, evento) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroEvento, data.data[i].id, sessionFiltroEvento], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                if (sessionFiltroTematica != -1) {
                    var consulta = 'INSERT INTO actividad_tematica (id, actividad, tematica) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroTematica, data.data[i].id, sessionFiltroTematica], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                if (sessionFiltroTematica2 != -1) {
                    var consulta = 'INSERT INTO actividad_tematica (id, actividad, tematica) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroTematica2, data.data[i].id, sessionFiltroTematica2], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                if (sessionFiltroParticipantes != -1) {
                    var consulta = 'INSERT INTO actividad_participante (id, actividad, participante) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroParticipantes, data.data[i].id, sessionFiltroParticipantes], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                if (sessionFiltroParticipantes2 != -1) {
                    var consulta = 'INSERT INTO actividad_tematica (id, actividad, participante) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroParticipantes2, data.data[i].id, sessionFiltroParticipantes2], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                if (sessionFiltroEtiqueta != -1) {
                    var consulta = 'INSERT INTO actividad_etiqueta (id, actividad, etiqueta) ' +
                            'VALUES(?,?,?)'
                    tx.executeSql(consulta, [data.data[i].id + '-' + sessionFiltroEtiqueta, data.data[i].id, sessionFiltroEtiqueta], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }

            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function updateActividad(data) {
    try {
        DownloadFile(data.actividad[0].urlImagen, "Takumba", "actividad" + data.actividad[0].id)

        db.transaction(function (tx) {
            var ext = "." + data.actividad[0].urlImagen.substr(data.actividad[0].urlImagen.lastIndexOf('.') + 1);
            var fp = getData('root')
            if (sessionFiltroLugar != -1) {
                var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, url_web=?, recinto=?, descripcion=?, num_me_gusta=?, alt_imagen=?, lugar_id=?, nombreLugar=?, long=?, lat=? WHERE id=? '
                tx.executeSql(consulta, [data.actividad[0].nombre, fp + "actividad" + data.actividad[0].id + ext, data.actividad[0].entradilla, data.actividad[0].fechaInicioOficial, data.actividad[0].horaInicioOficial, data.actividad[0].horaFinOficial, data.actividad[0].urlWeb, data.actividad[0].recinto, data.actividad[0].descripcion, data.actividad[0].numMeGusta, data.actividad[0].altImagen, sessionFiltroLugar, data.actividad[0].nombreLugar, data.actividad[0].longitud, data.actividad[0].latitud, data.actividad[0].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            } else {
                var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, url_web=?, recinto=?, descripcion=?, num_me_gusta=?, alt_imagen=?, nombreLugar=?, long=?, lat=? WHERE id=? '
                tx.executeSql(consulta, [data.actividad[0].nombre, fp + "actividad" + data.actividad[0].id + ext, data.actividad[0].entradilla, data.actividad[0].fechaInicioOficial, data.actividad[0].horaInicioOficial, data.actividad[0].horaFinOficial, data.actividad[0].fechaFinOficial, data.actividad[0].urlWeb, data.actividad[0].recinto, data.actividad[0].descripcion, data.actividad[0].numMeGusta, data.actividad[0].altImagen, data.actividad[0].nombreLugar, data.actividad[0].longitud, data.actividad[0].latitud, data.actividad[0].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertPosicionProyecto(data) {
    try {
        db.transaction(function (tx) {
            var consulta = 'INSERT INTO lugar (id, nombre, latitud, longitud, descripcion) ' +
                    'VALUES(?,?,?,?,?)'
            tx.executeSql(consulta, ['0', data[0].nombre, data[0].latitud, data[0].longitud, data[0].radio], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
            var consulta = 'UPDATE lugar SET nombre =?, latitud=?, longitud=?, descripcion=? WHERE id=? '
            tx.executeSql(consulta, [data[0].nombre, data[0].latitud, data[0].longitud, data[0].radio, '0'], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function insertPosicionEvento(data) {
    try {
        db.transaction(function (tx) {
            var consulta = 'INSERT INTO lugar (id, nombre, latitud, longitud) ' +
                    'VALUES(?,?,?,?)'
            tx.executeSql(consulta, ['even' + sessionFiltroEvento, data[0].nombre, data[0].latitud, data[0].longitud], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
            var consulta = 'UPDATE evento SET lugar_busqueda_id=? WHERE id=?'
            tx.executeSql(consulta, ['even' + sessionFiltroEvento, sessionFiltroEvento], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
            var consulta = 'UPDATE lugar SET nombre =?, latitud=?, longitud=? WHERE id=? '
            tx.executeSql(consulta, [data[0].nombre, data[0].latitud, data[0].longitud, 'even' + sessionFiltroEvento], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function updateDetalleEvento(data) {
    try {
        DownloadFile(data[0].urlImagen, "Takumba", "evento" + data[0].id)
        db.transaction(function (tx) {
            var ext = "." + data[0].urlImagen.substr(data[0].urlImagen.lastIndexOf('.') + 1);
            var fp = getData('root')
            var consulta = 'UPDATE evento SET url_imagen=?, descripcion=?, hora_inicio_oficial=?, hora_fin_oficial=?, ' +
                    'nombre=?, subtitulo=?, entradilla=?, fecha_inicio_oficial=?, alt_imagen=?, fecha_fin_oficial=?  WHERE id=?'
            tx.executeSql(consulta, [fp + "evento" + data[0].id + ext, data[0].descripcion, data[0].horaInicioOficial, data[0].horaFinOficial, data[0].nombre, data[0].subtitulo, data[0].entradilla, data[0].fechaInicioOficial, data[0].altImagen, data[0].fechaFinOficial, sessionFiltroEvento], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function updateLugar(data) {
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE lugar SET descripcion=?, latitud=?, nombre=?, longitud=? WHERE id=?'
            tx.executeSql(consulta, [data[0].descripcion, data[0].latitud, data[0].nombre, data[0].longitud, data[0].id], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectEventos() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM evento', [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                for (i = 0; i < len; i++) {
//                alert(results.rows.item(i).text);
                }
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoEventos() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT e.nombre as nombre, e.url_imagen as urlImagen, e.id as id, e.subtitulo as subtitulo, e.fecha_fin_oficial as fechaFin, e.fecha_inicio_oficial as fechaIni FROM evento AS e', [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        nombre: results.rows.item(i).nombre,
                        id: results.rows.item(i).id,
                        subtitulo: results.rows.item(i).subtitulo,
                        fechaIni: results.rows.item(i).fechaIni,
                        fechaFin: results.rows.item(i).fechaFin,
                        urlImagen: results.rows.item(i).urlImagen
                    })

                }
                parsearListadoEventos(data, 'listadoEventosIndice');
                console.info("---------Ev")
                console.info(data)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoEtiquetas() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM etiqueta WHERE evento_id = ' + sessionFiltroEvento, [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        nombre: results.rows.item(i).nombre,
                        id: results.rows.item(i).id,
                        color: results.rows.item(i).color
                    })

                }
                console.info("---------")
                console.info(data)

                parsearListadoEtiquetas(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPosProyecto() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM lugar WHERE id = ?', ['0'], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        nombre: results.rows.item(i).nombre,
                        latitud: results.rows.item(i).longitud,
                        radio: results.rows.item(i).descripcion,
                        longitud: results.rows.item(i).longitud
                    })
                }
                console.info("---------")
                console.info(data)
                parsearPosicionProyecto(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPosEvento() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM lugar WHERE id = ?', ['even' + sessionFiltroEvento], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    // launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        nombre: results.rows.item(i).nombre,
                        latitud: results.rows.item(i).longitud,
                        descripcion: results.rows.item(i).descripcion,
                        longitud: results.rows.item(i).longitud
                    })
                }
                console.info("---------")
                console.info(data)
                parsearPosicionEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectDetalleEvento() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM evento WHERE id = ?', [sessionFiltroEvento], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    // launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        urlImagen: results.rows.item(i).url_imagen,
                        descripcion: results.rows.item(i).descripcion,
                        horaInicioOficial: results.rows.item(i).hora_inicio_oficial,
                        horaFinOficial: results.rows.item(i).hora_fin_oficial,
                        nombre: results.rows.item(i).nombre,
                        subtitulo: results.rows.item(i).subtitulo,
                        entradilla: results.rows.item(i).entradilla,
                        fechaInicioOficial: results.rows.item(i).fecha_inicio_oficial,
                        altImagen: results.rows.item(i).alt_imagen,
                        fechaFinOficial: results.rows.item(i).fecha_fin_oficial
                    })
                }
                console.info("---------")
                console.info(data)
                parsearDetalleEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPatrocinadoresEvento() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM patrocinador WHERE idEve = ? ORDER by categoria', [sessionFiltroEvento], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        categoria: results.rows.item(i).categoria,
                        nombre: results.rows.item(i).nombre,
                        urlDestino: results.rows.item(i).url_destino,
                        urlLogotipo: results.rows.item(i).url_logotipo,
                        id: results.rows.item(i).idPat
                    })
                }
                console.info("---------")
                console.info(data)
                parsearPatrocinadoresEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectBannersEvento() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM banner WHERE idEve = ?', [sessionFiltroEvento], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        nombre: results.rows.item(i).nombre,
                        urlDestino: results.rows.item(i).url_destino,
                        urlImagen: results.rows.item(i).url_imagen,
                        id: results.rows.item(i).idBan
                    })
                }
                console.info("---------")
                console.info(data)
                parsearBannersEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectDetalleParticipante(p) {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM participante WHERE id = ?', [p], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        nombre: results.rows.item(i).nombre,
                        urlImagen: results.rows.item(i).url_imagen,
                        descripcion: results.rows.item(i).descripcion
                    })
                }
                console.info("---------")
                console.info(data)
                parsearDetalleParticipante(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoActitividades() {
    try {
        db.transaction(function (tx) {
            var campos = "SELECT a.nombre as nombre, " +
                    "a.id as id, " +
                    "a.url_imagen as url_imagen, " +
                    "a.entradilla as entradilla, " +
                    "a.fecha_inicio_oficial as fecha_inicio_oficial, " +
                    "a.hora_inicio_oficial as hora_inicio_oficial, " +
                    "a.hora_fin_oficial as hora_fin_oficial, " +
                    "a.nombreLugar as nombreLugar, " +
                    "a.long as longitud, " +
                    "a.lat as latitud, " +
                    "a.fecha_fin_oficial as fecha_fin_oficial ";
            var from = "FROM actividad as a";
            var params = new Array();
            var where = " WHERE a.id = a.id "
            var cont = 0;

            if (sessionFiltroEvento != -1) {
                where += " AND a.id = ev.actividad AND ev.evento = ? "
                from += ", actividad_evento as ev "
                params.push(sessionFiltroEvento)
                cont++;
            }
            if (sessionFiltroLugar != -1) {
                where += " AND a.lugar_id = ? "
                params.push(sessionFiltroLugar)
                cont++;
            }
            if (sessionFiltroTematica != -1 && cont < 2) {
                where += " AND a.id = te.actividad AND te.tematica = ? "
                from += ", actividad_tematica as te "
                params.push(sessionFiltroTematica)
                cont++;
            }
//        if (sessionFiltroTematica2 != -1 && cont < 2) {
//            ruta += "&tematica2=" + sessionFiltroTematica2;
//            cont++
//        }
            if (sessionFiltroParticipantes != -1 && cont < 2) {
                where += " AND a.id = pa.actividad AND pa.participante = ? "
                from += ", actividad_participante as pa "
                params.push(sessionFiltroParticipantes)
                cont++;
            }
//        if (sessionFiltroParticipantes2 != -1 && cont < 2) {
//            ruta += "&participante2=" + sessionFiltroParticipantes2;
//            cont++
//        }
            if (sessionFiltroFecha != -1 && cont < 2) {
                where += " AND (a.fecha_inicio_oficial-86400000) < ? AND (a.fecha_fin_oficial-(-86400000)) > ?"
                params.push(sessionFiltroFecha)
                params.push(sessionFiltroFecha)
                cont++;
            }
            if (sessionFiltroEtiqueta != -1 && cont < 2) {
                where += " AND a.id = et.actividad AND et.etiqueta = ? "
                from += ", actividad_etiqueta as et "
                params.push(sessionFiltroEtiqueta)
                cont++;
            }

            var consulta = campos + from + where;
            console.log("**************************")
            console.info(consulta)
            console.info(params)
            console.log("**************************")


            tx.executeSql(consulta, params, function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        nombre: results.rows.item(i).nombre,
                        urlImagen: results.rows.item(i).url_imagen,
                        entradilla: results.rows.item(i).entradilla,
                        fechaInicioOficial: results.rows.item(i).fecha_inicio_oficial,
                        horaInicioOficial: results.rows.item(i).hora_inicio_oficial,
                        horaFinOficial: results.rows.item(i).hora_fin_oficial,
                        nombreLugar: results.rows.item(i).nombreLugar,
                        longitud: results.rows.item(i).longitud,
                        latitud: results.rows.item(i).latitud,
                        fechaFinOficial: results.rows.item(i).fechaFinOficial
                    })
                }
                var data1 = {data: data}

                console.info("---------")
                console.info(data1)
                parsearListadoActividades(data1);
                return data1;
            }, function (e) {
                console.error(e.message)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectActividad(idAct) {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM actividad WHERE id = ?', [idAct], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        urlWeb: results.rows.item(i).url_web,
                        recinto: results.rows.item(i).recinto,
                        descripcion: results.rows.item(i).descripcion,
                        numMeGusta: results.rows.item(i).num_me_gusta,
                        altImagen: results.rows.item(i).alt_imagen,
                        nombre: results.rows.item(i).nombre,
                        urlImagen: results.rows.item(i).url_imagen,
                        entradilla: results.rows.item(i).entradilla,
                        fechaInicioOficial: results.rows.item(i).fecha_inicio_oficial,
                        horaInicioOficial: results.rows.item(i).hora_inicio_oficial,
                        horaFinOficial: results.rows.item(i).hora_fin_oficial,
                        longitud: results.rows.item(i).longitud,
                        nombreLugar: results.rows.item(i).nombreLugar,
                        latitud: results.rows.item(i).latitud,
                        fechaFinOficial: results.rows.item(i).fechaFinOficial
                    })
                }
                var data1 = {actividad: data}
                console.info("---------")
                console.info(data1)
                parsearActividad(data1);
                return data1;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoParticipantes() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM participante', [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        urlImagen: results.rows.item(i).url_imagen,
                        nombre: results.rows.item(i).nombre,
                        descripcion: results.rows.item(i).descripcion
                    })
                }
                parsearListadoParticipantes(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoTematicas() {
    try {
        db.transaction(function (tx) {
            if (sessionFiltroEvento != -1) {
                tx.executeSql('SELECT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                        ' FROM tematica as t, actividad_tematica as at, actividad_evento as ae ' +
                        ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.evento = ?', [sessionFiltroEvento], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre,
                            color: results.rows.item(i).color
                        })
                    }
                    parsearListadoTematicas(data);
                    return data;
                });
            } else if (sessionFiltroEtiqueta != -1) {
                tx.executeSql('SELECT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                        ' FROM tematica as t, actividad_tematica as at, actividad_etiqueta as ae ' +
                        ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.etiqueta = ?', [sessionFiltroEtiqueta], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre,
                            color: results.rows.item(i).color
                        })
                    }
                    parsearListadoTematicas(data);
                    console.log('SELECT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                            ' FROM tematica as t, actividad_tematica as at, actividad_etiqueta as ae ' +
                            ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.etiqueta = ?')
                    console.log(data)
                    return data;
                });
            } else if (sessionFiltroParticipantes != -1) {
                tx.executeSql('SELECT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                        ' FROM tematica as t, actividad_tematica as at, actividad_participante as ae ' +
                        ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.participante = ?', [sessionFiltroParticipantes], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre,
                            color: results.rows.item(i).color
                        })
                    }
                    parsearListadoTematicas(data);
                    return data;
                });
            } else
                tx.executeSql('SELECT * FROM tematica', [], function (tx, results) {
                    var len = results.rows.length, i;
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre,
                            color: results.rows.item(i).color
                        })
                    }
                    parsearListadoTematicas(data);
                    console.log(data)
                    return data;
                });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectNomenclaturaMenu() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM nomenclatura_menu', [], function (tx, results) {
                var len = results.rows.length, i;
                var data = {};
                for (i = 0; i < len; i++) {
                    var clave = results.rows.item(i).id
                    if (clave == "favoritos") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "tematicas") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "lugares") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "participantes") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "cerca") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "fecha") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "acerca") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "etiquetas") {
                        data[clave] = results.rows.item(i).valor
                    }
                    if (clave == "patrocinadores") {
                        data[clave] = results.rows.item(i).valor
                    }

                }
                console.info("+++++++++++++++++");
                console.info(data)
                parsearMenuLateral(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoLugares() {
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM lugar', [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        urlImagen: results.rows.item(i).url_imagen,
                        nombre: results.rows.item(i).nombre
                    })
                }
                console.info("---------");
                console.info(data)
                parsearListadoLugares(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}


function createBBDD() {
    try {
        db.transaction(function (tx) {
            /*evento*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS "evento" (' +
                    'id unique,' +
                    'version,' +
                    'alt_imagen,' +
                    'descripcion,' +
                    'entradilla,' +
                    'fecha_fin_activa,' +
                    'fecha_fin_oficial,' +
                    'fecha_inicio_activa,' +
                    'fecha_inicio_oficial,' +
                    'hora_fin_activa,' +
                    'hora_fin_oficial,' +
                    'hora_inicio_activa,' +
                    'hora_inicio_oficial,' +
                    'lugar_busqueda_id,' +
                    'lugar_evento_id,' +
                    'nombre,' +
                    'permamente,' +
                    'radio_busqueda,' +
                    'subtitulo,' +
                    'url_imagen' +
                    ')');
            /*etiqueta*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS etiqueta (' +
                    'id unique,' +
                    'color, ' +
                    'evento_id,' +
                    'nombre' +
                    ')');
            /*Participantes*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS participante (' +
                    'id unique,' +
                    'descripcion,' +
                    'nombre,' +
                    'url_imagen,' +
                    'url_thumbnail' +
                    ')');
            /*Lugares*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS lugar (' +
                    'id unique,' +
                    'descripcion,' +
                    'latitud,' +
                    'longitud,' +
                    'nombre' +
                    ')')
            /*Patrocinadores*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS patrocinador (' +
                    'id unique,' +
                    'idPat,' +
                    'idEve,' +
                    'categoria,' +
                    'nombre,' +
                    'url_destino,' +
                    'url_logotipo' +
                    ')');
            /*Banner*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS banner (' +
                    'id unique,' +
                    'idBan,' +
                    'idEve,' +
                    'nombre,' +
                    'url_destino,' +
                    'url_imagen' +
                    ')');
            /*actividad*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad (' +
                    'id unique,' +
                    'alt_imagen,' +
                    'alt_imagen_descripcion,' +
                    'descripcion,' +
                    'entradilla,' +
                    'fecha_fin_activa,' +
                    'fecha_fin_oficial,' +
                    'fecha_inicio_activa,' +
                    'fecha_inicio_oficial,' +
                    'hora_fin_oficial,' +
                    'hora_inicio_oficial,' +
                    'horario,' +
                    'lugar_id,' +
                    'nombre,' +
                    'num_me_gusta,' +
                    'permanente,' +
                    'nombreLugar,' +
                    'long,' +
                    'lat,' +
                    'recinto,' +
                    'url_imagen,' +
                    'url_imagen_descripcion,' +
                    'url_thumbnail,' +
                    'url_video,' +
                    'url_web' +
                    ')');
        });
        db.transaction(function (tx) {
            /*tematica*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS tematica (' +
                    'id unique,' +
                    'color,' +
                    'nombre,' +
                    'url_imagen' +
                    ')');
            /*actividad tematica*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad_tematica (id unique, actividad, tematica)');
            /*actividad participante*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad_participante (id unique, actividad , participante )');
            /*actividad etiqueta*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad_etiqueta (id unique, actividad , etiqueta )');
            /*actividad evento*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad_evento (id unique, actividad , evento )');
            /*nomenclatura menu*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS nomenclatura_menu (id unique, valor)');
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}