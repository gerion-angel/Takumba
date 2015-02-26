var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
if (getData('haSincronizadoInicialmente') != 1) {
    createBBDD();
}

/*inserta los eventos*/
function insertEventos(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        var promesa = new Promise(function (okInsert, noInsert) {
            db.transaction(function (tx) {
                var consultaInt = "SELECT * FROM evento;"
                console.log(consultaInt)
                tx.executeSql(consultaInt, [],
                        function (tx, results) {
                            var len = results.rows.length, i;
                            console.log(results)
                            var dataInsert = [];
                            for (i = 0; i < len; i++) {
                                dataInsert.push({
                                    id: results.rows.item(i).id,
                                    alt_imagen: results.rows.item(i).alt_imagen,
                                    descripcion: results.rows.item(i).descripcion,
                                    entradilla: results.rows.item(i).entradilla,
                                    fecha_fin_activa: results.rows.item(i).fecha_fin_activa,
                                    fecha_inicio_activa: results.rows.item(i).fecha_inicio_activa,
                                    hora_fin_oficial: results.rows.item(i).hora_fin_oficial,
                                    hora_inicio_oficial: results.rows.item(i).hora_inicio_oficial,
                                    lugar_busqueda_id: results.rows.item(i).lugar_busqueda_id,
                                    permanente: results.rows.item(i).permanente,
                                    radio_busqueda: results.rows.item(i).radio_busqueda
                                })
                            }
                            okInsert(dataInsert);
                        }, function (e) {
                    console.error(e)
                });
            }, function (e) {
            }, function (e) {

                noInsert(e)
            });
        })
        promesa.then(function (dataOk) {
            console.log("promesa cumplida")
            db.transaction(function (tx) {
                console.info(dataOk)
                if(dataOk.length>0)
                for (var i = 0; i < data.length; i++) {
                    var paraInsertar = -1;
                    for (var j = 0; j < dataOk.length; j++) {
                        if (dataOk[j].id == data[i].id)
                            paraInsertar = j
                    }
                    if (paraInsertar==-1) {
                        var consulta = 'INSERT OR IGNORE INTO evento (id, nombre, url_imagen, subtitulo, fecha_fin_oficial, fecha_inicio_oficial) ' +
                                'VALUES (?,?,?,?,?,?)'
                        console.log(consulta)
                        tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].urlImagen, data[i].subtitulo, new Date(data[i].fechaFin).getTime(), new Date(data[i].fechaIni).getTime()], function (i) {
                            console.info("insert" + i)
                        }, function (e) {
                            console.error(e)
                        });
                    } else {
                        var consulta = 'UPDATE evento SET nombre =?, url_imagen=?, subtitulo=?, fecha_fin_oficial=?, fecha_inicio_oficial=? ' +
                                ', version=version-(-1), alt_imagen=?, descripcion=?, entradilla=?, ' +
                                'fecha_fin_activa=?, fecha_inicio_activa=?, hora_fin_oficial=?,' +
                                ' hora_inicio_oficial=?, lugar_busqueda_id=?, ' +
                                ' permanente=?, radio_busqueda=? WHERE id=? '
                        console.log(consulta)
                        tx.executeSql(consulta, [data[i].nombre,
                            data[i].urlImagen,
                            data[i].subtitulo,
                            new Date(data[i].fechaFin).getTime(),
                            new Date(data[i].fechaIni).getTime(),
                            dataOk[paraInsertar].alt_imagen,
                            dataOk[paraInsertar].descripcion,
                            dataOk[paraInsertar].entradilla,
                            dataOk[paraInsertar].fecha_fin_activa,
                            dataOk[paraInsertar].fecha_inicio_activa,
                            dataOk[paraInsertar].hora_fin_oficial,
                            dataOk[paraInsertar].hora_inicio_oficial,
                            dataOk[paraInsertar].lugar_busqueda_id,
                            dataOk[paraInsertar].permanente,
                            dataOk[paraInsertar].radio_busqueda,
                            data[i].id], function (i) {
                            console.info("update" + i)
                        }, function (e) {
                            //console.error(e)
                        });
                    }
                }
            });
        })


    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*inserta los eventos SincroInicial*/
function insertEventosSincroIncial(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO evento (id ,' +
                        'alt_imagen,' +
                        'descripcion,' +
                        'entradilla,' +
                        'fecha_fin_activa,' +
                        'fecha_fin_oficial,' +
                        'fecha_inicio_activa,' +
                        'fecha_inicio_oficial,' +
                        'hora_fin_oficial,' +
                        'hora_inicio_oficial,' +
                        'lugar_busqueda_id,' +
                        'lugar_evento_id,' +
                        'nombre,' +
                        'permanente,' +
                        'radio_busqueda,' +
                        'subtitulo) ' +
                        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].altImagen, data[i].descripcion, data[i].entradilla, new Date(data[i].fechaFinActiva).getTime()
                            , new Date(data[i].fechaFin).getTime(), new Date(data[i].fechaInicioActiva).getTime(), new Date(data[i].fechaIni).getTime(), data[i].horaInicioOficial, data[i].horaFinOficial
                            , data[i].lugarBusqueda, data[i].lugarEvento, data[i].nombre, data[i].permanente, data[i].radioBusqueda, data[i].subtitulo], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                imgEvento(data[i].id);
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*delete evento*/
function deleteEventos(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM evento WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_evento WHERE evento = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM banner WHERE idEve = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM etiqueta WHERE etiqueta_id = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM patrocinador WHERE idPat = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta las etiquetas*/
function insertEtiquetas(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            var eventoAux = sessionFiltroEvento;
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO etiqueta (id, nombre, color, evento_id) ' +
                        'VALUES(?,?,?,?)'
                if (data[i].idEvento && data[i].idEvento != "" && data[i].idEvento != null && data[i].idEvento != undefined) {
                    eventoAux = data[i].idEvento;
                }
                tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].color, eventoAux], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE etiqueta SET nombre =?, color=?, evento_id=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].color, eventoAux, data[i].id], function (i) {
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
function insertMetadata(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            var consulta = 'INSERT INTO metadata (id, tipoFecha, mostrarParticipantes) ' +
                    'VALUES(?,?,?)'

            tx.executeSql(consulta, [sessionProyecto, data.tipoFecha, data.mostrarParticipantes], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
            var consulta = 'UPDATE metadta SET tipoFecha =?, mostrarParticipantes=? WHERE id=? '

            tx.executeSql(consulta, [data.tipoFecha, data.mostrarParticipantes, sessionProyecto], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*delete etiquetas*/
function deleteEtiquetas(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM etiqueta WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_etiqueta WHERE etiqueta = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta participantes*/
function insertParticipantes(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO participante (id, nombre, url_imagen, descripcion, url_thumbnail) ' +
                        'VALUES(?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].urlImagen, data[i].descripcion, data[i].urlThumbnail], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE participante SET nombre =?, url_imagen=?, descripcion=?, url_thumbnail=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].urlImagen, data[i].descripcion, data[i].urlThumbnail, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                imgParticipante(data[i].id)
                thuParticipante(data[i].id)
            }
        });
    } catch (e) {/*no admite almacenamiento IE, FF*/
    } finally {
        $("#canvasLoader").remove()
    }
}

/*delete participante*/
function deleteParticipantes(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM participante WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_participante WHERE participante = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta tematicas*/
function insertTematicas(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        /*for (var i = 0; i < data.length; i++) {
         DownloadFile(data[i].urlImagen, "aytoArroyoEncomienda", "tematica" + data[i].id)
         }*/
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO tematica (id, nombre, url_imagen, color) ' +
                        'VALUES(?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].urlImagen, data[i].color], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE tematica SET nombre =?, url_imagen=?, color=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].urlImagen, data[i].color, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*delete tematica*/
function deleteTematicas(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM tematica WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_tematica WHERE tematica = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta lugares*/
function insertLugares(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO lugar (id, nombre, latitud, longitud, descripcion, urlImagen) ' +
                        'VALUES(?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id, data[i].nombre, data[i].latitud, data[i].longitud, data[i].descripcion, data[i].urlImagen], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE lugar SET nombre =?, urlImagen=?, latitud=?, logintud=?, descripcion=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].urlImagen, data[i].latitud, data[i].longitud, data[i].descripcion, data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                imgLugar(data[i].id)
            }
        });
    } catch (e) {/*no admite almacenamiento IE, FF*/
    } finally {
        $("#canvasLoader").remove()
    }
}

/*delete lugar*/
function deleteLugares(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM lugar WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta patrocinadores*/
function insertPatrocinadores(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        /*for (var i = 0; i < data.length; i++) {
         DownloadFile(data[i].urlLogotipo, "aytoArroyoEncomienda", "patrocinador" + data[i].id)
         }*/
        var eventoAux = sessionFiltroEvento;
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO patrocinador (id, categoria, nombre, url_destino, url_logotipo, idPat, idEve) ' +
                        'VALUES(?,?,?,?,?,?,?)'
                if (data[i].idEvento && data[i].idEvento != "" && data[i].idEvento && data[i].idEvento != null && data[i].idEvento != undefined) {
                    eventoAux = data[i].idEvento;
                }
                tx.executeSql(consulta, [data[i].id + 'eve' + eventoAux, data[i].categoria, data[i].nombre, data[i].urlDestino, data[i].urlLogotipo, data[i].id, eventoAux], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                if (data[i].urlLogotipo && data[i].urlLogotipo != undefined && data[i].urlLogotipo != null) {
                    var consulta = 'UPDATE patrocinador SET categoria =?, nombre=?, url_destino=?, url_logotipo=? WHERE idPat=? '
                    tx.executeSql(consulta, [data[i].categoria, data[i].nombre, data[i].urlDestino, data[i].urlLogotipo, data[i].id], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
                imgPatrocinador(data[i].id)
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*delete Patrocinador*/
function deletePatrocinadores(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM patrocinador WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*inserta banners a los eventos*/
function insertBannersEvento(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        var eveAux = sessionFiltroEvento;
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].idEvento && data[i].idEvento != "" && data[i].idEvento != null && data[i].idEvento != undefined) {
                    eveAux = sessionFiltroEvento;
                }
                var consulta = 'INSERT INTO banner (id, nombre, url_destino, url_imagen, idBan, idEve, idAct) ' +
                        'VALUES(?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [data[i].id + 'eve' + eveAux + 'act' + data[i].idActividad,
                    data[i].nombre,
                    data[i].urlDestino,
                    data[i].urlImagen,
                    data[i].id,
                    eveAux,
                    data[i].idActividad], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE banner SET nombre=?, url_destino=?, url_imagen=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombre, data[i].urlDestino, data[i].urlImagen, data[i].id + 'eve' + eveAux + 'act' + data[i].idActividad], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                imgBanner(data[i].id)
            }
        });
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*delete banner*/
function deleteBannerEvento(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM banner WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*nomenclatura menu*/
function insertNomenclaturaMenu(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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

/*delete nomenclatura menu*/
function deleteNomenclaturaMenu(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM nomenclatura_menu WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*nomenclatura actividad*/
function insertNomenclaturaActividad(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {

                var consulta = 'INSERT INTO nomenclatura_actividad (id, nombre, nombreApp, idActividad) ' +
                        'VALUES(?,?,?,?)'
                tx.executeSql(consulta, [data[i].nombre + data[i].idActividad, data[i].nombre, data[i].nombreApp, data[i].idActividad], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                var consulta = 'UPDATE nomenclatura_menu SET nombreApp=? WHERE id=? '
                tx.executeSql(consulta, [data[i].nombreApp, data[i].nombre + data[i]], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*delete nomenclatura actividad*/
function deleteNomenclaturaActividad(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM nomenclatura_actividad WHERE idActividad = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

function insertActividadEtiquetaSincroInicial(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        for (var i = 0; i < data.length; i++) {
            var consulta = 'INSERT INTO actividad_etiqueta (id, actividad, etiqueta) ' +
                    'VALUES(?,?,?)'
            tx.executeSql(consulta, [data[i].idActividad + '-' + data[i].idEtiqueta, data[i].idActividad, data[i].idEtiqueta], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        }
    });
}

/*para guardar las relaciones de evento con actividad en la sincronizacion inicial*/
function insertActividadEventoSincroInicial(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        for (var i = 0; i < data.length; i++) {
            var consulta = 'INSERT INTO actividad_evento (id, actividad, evento) ' +
                    'VALUES(?,?,?)'
            tx.executeSql(consulta, [data[i].idActividad + '-' + data[i].idEvento, data[i].idActividad, data[i].idEvento], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        }
    });
}

/*para guardar las relaciones de participante con actividad en la sincronizacion inicial*/
function insertActividadParticipanteSincroInicial(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        for (var i = 0; i < data.length; i++) {
            var consulta = 'INSERT INTO actividad_participante (id, actividad, participante) ' +
                    'VALUES(?,?,?)'
            tx.executeSql(consulta, [data[i].idActividad + '-' + data[i].idParticipante, data[i].idActividad, data[i].idParticipante], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        }
    });
}

/*para guardar las relaciones de participante con actividad en la sincronizacion inicial*/
function insertActividadTematicaSincroInicial(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        for (var i = 0; i < data.length; i++) {
            var consulta = 'INSERT INTO actividad_tematica (id, actividad, tematica) ' +
                    'VALUES(?,?,?)'
            tx.executeSql(consulta, [data[i].idActividad + '-' + data[i].idTematica, data[i].idActividad, data[i].idTematica], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        }
    });
}

/*para insertar actividades tras la llamada a getActividades*/
function insertActividades(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.data.length; i++) {
                var consulta = 'INSERT INTO actividad (id, nombre, url_imagen, entradilla, fecha_inicio_oficial, hora_inicio_oficial, hora_fin_oficial, fecha_fin_oficial, lugar_id, nombreLugar, long, lat, permanente, fecha_inicio_activa, fecha_fin_activa) ' +
                        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [data.data[i].id, data.data[i].nombre, data.data[i].urlImagen, data.data[i].entradilla, new Date(new Date(data.data[i].fechaInicioOficial).getTime()).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(new Date(data.data[i].fechaFinOficial).getTime()).getTime(), sessionFiltroLugar, data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud, data.data[i].permanente, new Date(data.data[i].fechaInicioActiva).getTime(), new Date(data.data[i].fechaFinActiva).getTime()], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                if (sessionFiltroLugar != -1) {
                    var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, lugar_id=?, nombreLugar=?, long=?, lat=? , permanente=?, fecha_inicio_activa=?, fecha_fin_activa WHERE id=? '
                    tx.executeSql(consulta, [data.data[i].nombre, data.data[i].urlImagen, data.data[i].entradilla, new Date(data.data[i].fechaInicioOficial).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(data.data[i].fechaFinOficial).getTime(), sessionFiltroLugar, data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud, data.data[i].permanente, new Date(data.data[i].fechaInicioActiva).getTime(), new Date(data.data[i].fechaFinActiva).getTime(), data.data[i].id], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                } else {
                    var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, nombreLugar=?, long=?, lat=? , permanente=?, fecha_inicio_activa=?, fecha_fin_activa WHERE id=? '
                    tx.executeSql(consulta, [data.data[i].nombre, data.data[i].urlImagen, data.data[i].entradilla, new Date(data.data[i].fechaInicioOficial).getTime(), data.data[i].horaInicioOficial, data.data[i].horaFinOficial, new Date(data.data[i].fechaFinOficial).getTime(), data.data[i].nombreLugar, data.data[i].longitud, data.data[i].latitud, data.data[i].permanente, new Date(data.data[i].fechaInicioActiva).getTime(), new Date(data.data[i].fechaFinActiva).getTime(), data.data[i].id], function (i) {
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
                if (data.data[i].recurrencia_fecha != null) {
                    consulta = 'INSERT INTO actividad_recurrencia (idActividad, rule)' +
                            'VALUES (?,?)'
                    tx.executeSql(consulta, [data.data[i].id, data.data[i].recurrencia_fecha], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                    consulta = 'UPDATE actividad_recurrencia SET rule = ? WHERE id = ?'
                    tx.executeSql(consulta, [data.data[i].recurrencia_fecha, data.data[i].id], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                } else {
                    tx.executeSql("DELETE FROM actividad_recurrencia WHERE id= ?", [data.data[i].id], function (i) {
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

/*insertActividad solo en sincro inicial*/
function insertActividadesSoloSincro(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'INSERT INTO actividad (id,' +
                        'alt_imagen,' +
                        'alt_imagen_descripcion,' +
                        'descripcion,' +
                        'entradilla,' +
                        'fecha_fin_activa,' +
                        'fecha_fin_oficial,' +
                        'fecha_inicio_activa,' +
                        'fecha_inicio_oficial,' +
                        'hora_fin_oficial,' + //10
                        'hora_inicio_oficial,' +
                        'horario,' +
                        'lugar_id,' +
                        'nombre,' +
                        'num_me_gusta,' +
                        'permanente,' +
                        'nombreLugar,' +
                        'long,' +
                        'lat,' +
                        'recinto,' + //20
                        'url_video,' +
                        'url_web) ' + //22
                        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                tx.executeSql(consulta, [
                    data[i].id,
                    data[i].altImagen,
                    data[i].altImagenDescripcion,
                    data[i].descripcion,
                    data[i].entradilla,
                    new Date(data[i].fechaFinActiva).getTime(),
                    new Date(data[i].fechaFinOficial).getTime(),
                    new Date(data[i].fechaInicioActiva).getTime(),
                    new Date(data[i].fechaInicioOficial).getTime(),
                    data[i].horaFinOficial,
                    data[i].horaInicioOficial,
                    data[i].horario,
                    data[i].lugar,
                    data[i].nombre,
                    data[i].numMeGusta,
                    data[i].permanente,
                    data[i].nombreLugar,
                    data[i].longitud,
                    data[i].latitud,
                    data[i].recinto,
                    data[i].urlVideo,
                    data[i].urlWeb
                ], function (i) {
                }, function (e) {
                    //console.error(e)
                });
                imgActividad(data[i].id)
                thuActividad(data[i].id)
                if (data[i].recurrenciaFecha != null) {
                    tx.executeSql("INSERT INTO actividad_recurrencia (idActividad, rule) VALUES (?,?)",
                            [data[i].id, data[i].recurrenciaFecha], function (i) {
                        //console.info(i)
                    }, function (e) {
                        //console.error(e)
                    });
                }
            }
        })

    } catch (e) {
    }//no soporte
}

function imgActividad(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=actividad&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgActividad(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function thuActividad(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=actividad&tipo=th"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateThActividad(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function imgBanner(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=banner&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgBanner(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function imgLugar(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=lugar&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgLugar(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function imgParticipante(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=participante&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgParticipante(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function thuParticipante(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=participante&tipo=th"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateThParticipante(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function imgPatrocinador(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=patrocinador&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgPatrocinador(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}
function imgEvento(id) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    setTimeout(function () {
        try {
            var auth = make_base_auth("app", "Kurbana2k14");
            var ruta = sessionPath + "proyecto/getImages?id=" + id + "&tabla=evento&tipo=img"
            $.ajaxSetup({
                headers: {
                    'Authorization': auth,
                }
            });
            $.getJSON(ruta, null, function (dataImg) {
                updateImgEvento(id, dataImg)
            });
        } catch (e) {
            console.error(e)
        }
    }, 1)
}

/*delete actividad*/
function deleteActividad(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            for (var i = 0; i < data.length; i++) {
                var consulta = 'DELETE FROM actividad WHERE id = ?';
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_evento WHERE actividad = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_participante WHERE actividad = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_etiqueta WHERE actividad = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_evento WHERE actividad = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
                consulta = 'DELETE FROM actividad_recurrencia WHERE idActividad = ?'
                tx.executeSql(consulta, [data[i].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
        })
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

/*update img de una actividad*/
function updateImgActividad(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE actividad SET url_imagen=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una actividad*/
function updateThActividad(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE actividad SET url_thumbnail=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una banner*/
function updateImgBanner(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE banner SET url_imagen=? WHERE idBan=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una ñlugar*/
function updateImgLugar(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE lugar SET urlImagen=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una participante*/
function updateImgParticipante(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE participante SET url_imagen=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una actividad*/
function updateThParticipante(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE participante SET url_thumbnail=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update th de una actividad*/
function updateImgPatrocinador(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE patrocinador SET url_logotipo=? WHERE idPat=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}
/*update img de una evento*/
function updateImgEvento(id, data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    var img = data.imagen;
    try {
        db.transaction(function (tx) {
            var consulta = 'UPDATE evento SET url_imagen=? WHERE id=?'
            tx.executeSql(consulta, [img, id], function (i) {
                //console.info(i)  
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*update de una actividad*/
function updateActividad(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            if (sessionFiltroLugar != -1) {
                var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, url_web=?, recinto=?, descripcion=?, num_me_gusta=?, alt_imagen=?, lugar_id=?, nombreLugar=?, long=?, lat=?, fecha_inicio_activa=?, fecha_fin_activa=?, permanente=? WHERE id=? '
                tx.executeSql(consulta, [data.actividad[0].nombre, data.actividad[0].urlImagen, data.actividad[0].entradilla, new Date(data.actividad[0].fechaInicioOficial).getTime(), data.actividad[0].horaInicioOficial, data.actividad[0].horaFinOficial, data.actividad[0].urlWeb, data.actividad[0].recinto, data.actividad[0].descripcion, data.actividad[0].numMeGusta, data.actividad[0].altImagen, sessionFiltroLugar, data.actividad[0].nombreLugar, data.actividad[0].longitud, data.actividad[0].latitud, new Date(data.actividad[0].fechaInicioActiva).getTime(), new Date(data.actividad[0].fechaFinActiva).getTime(), data.actividad[0].permanente, data.actividad[0].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            } else {
                var consulta = 'UPDATE actividad SET nombre=?, url_imagen=?, entradilla=?, fecha_inicio_oficial=?, hora_inicio_oficial=?, hora_fin_oficial=?, fecha_fin_oficial=?, url_web=?, recinto=?, descripcion=?, num_me_gusta=?, alt_imagen=?, nombreLugar=?, long=?, lat=?, fecha_inicio_activa=?, fecha_fin_activa=?, permanente=? WHERE id=? '
                tx.executeSql(consulta, [data.actividad[0].nombre, data.actividad[0].urlImagen, data.actividad[0].entradilla, new Date(data.actividad[0].fechaInicioOficial).getTime(), data.actividad[0].horaInicioOficial, data.actividad[0].horaFinOficial, new Date(data.actividad[0].fechaFinOficial).getTime(), data.actividad[0].urlWeb, data.actividad[0].recinto, data.actividad[0].descripcion, data.actividad[0].numMeGusta, data.actividad[0].altImagen, data.actividad[0].nombreLugar, data.actividad[0].longitud, data.actividad[0].latitud, new Date(data.actividad[0].fechaInicioActiva).getTime(), new Date(data.actividad[0].fechaFinActiva).getTime(), data.actividad[0].permanente, data.actividad[0].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            }
            if (data.actividad[0].recurrencia_fecha != null) {
                consulta = 'UPDATE actividad_recurrencia SET rule = ? WHERE id = ?'
                tx.executeSql(consulta, [data.actividad[0].recurrencia_fecha, data.actividad[0].id], function (i) {
                    //console.info(i)
                }, function (e) {
                    //console.error(e)
                });
            } else {
                tx.executeSql("DELETE FROM actividad_recurrencia WHERE id= ?", [data.actividad[0].id], function (i) {
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
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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

/*update del detalle de evento*/
function updateDetalleEvento(data) {
    console.error("UPDATE DETALLE EVENTO")
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        //DownloadFile(data[0].urlImagen, "aytoArroyoEncomienda", "evento" + data[0].id)
        db.transaction(function (tx) {
            var consulta = 'UPDATE evento SET url_imagen=?, descripcion=?, hora_inicio_oficial=?, hora_fin_oficial=?, ' +
                    'nombre=?, subtitulo=?, entradilla=?, fecha_inicio_oficial=?, alt_imagen=?, fecha_fin_oficial=?, permanente=?  WHERE id=?'
            tx.executeSql(consulta, [data[0].urlImagen, data[0].descripcion, data[0].horaInicioOficial, data[0].horaFinOficial, data[0].nombre, data[0].subtitulo, data[0].entradilla, new Date(data[0].fechaInicioOficial).getTime(), data[0].altImagen, new Date(data[0].fechaFinOficial).getTime(), data[0].permanente, sessionFiltroEvento], function (i) {
                //console.info(i)
            }, function (e) {
                //console.error(e)
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function updateLugar(data) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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

/**
 * SELECTS VARIOS
 */

function selectEventos() {

    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
    alert("listado de eventos")
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            var jsNow = new Date().getTime()
            tx.executeSql('SELECT e.nombre as nombre, e.url_imagen as urlImagen, e.id as id, e.subtitulo as subtitulo, e.fecha_fin_oficial as fechaFin, e.fecha_inicio_oficial as fechaIni FROM evento AS e'
                    + " WHERE e.permanente = 'true' OR (e.fecha_fin_activa >= ? AND e.fecha_inicio_activa <= ?)", [jsNow, jsNow], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    launchPop()
                }
                alert(len + " Eventos")
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
                $("#splashDiv").remove()
                parsearListadoEventos(data, 'listadoEventosIndice');
            });
        });
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoEtiquetas() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                parsearListadoEtiquetas(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*select metadata*/
function selectMetadata() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM metadata WHERE id = ' + sessionProyecto, [], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                } else {
                    sessionDateFormat = results.rows.item(0).tipoFecha;
                    var mostrarParticipantes = results.rows.item(0).mostrarParticipantes;
                    reverseDateFormat = new SimpleDateFormat(sessionDateFormat);
                    if (mostrarParticipantes == false || mostrarParticipantes == "false") {
                        $("#menuPrincipal .participantesMenu").parent().hide()
                    }
                }
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPosProyecto() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                parsearPosicionProyecto(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPosEvento() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT l.nombre AS nombre, l.latitud AS latitud, l.descripcion AS descripcion, l.longitud AS longitud FROM lugar AS l, evento AS e ' +
                    ' WHERE l.id = e.lugar_evento_id AND e.id = ?', [sessionFiltroEvento], function (tx, results) {
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
                parsearPosicionEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectDetalleEvento() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                        fechaFinOficial: results.rows.item(i).fecha_fin_oficial,
                        nombreLugar: results.rows.item(i).nombre_lugar
                    })
                }
                parsearDetalleEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectPatrocinadoresEvento() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM patrocinador WHERE idEve = ? ORDER by categoria', [sessionFiltroEvento], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
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
                parsearPatrocinadoresEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectBannersEvento() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                parsearBannersEvento(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectDetalleParticipante(p) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM participante WHERE id = ?', [p], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
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
                parsearDetalleParticipante(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoActividades() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        if (sessionFiltroFecha == -1) {
            db.transaction(function (tx) {
                var campos = "SELECT a.nombre as nombre, " +
                        "a.id as id, " +
                        "a.url_thumbnail as url_imagen, " +
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
                var where = " WHERE (a.permanente = 'true' OR (a.fecha_inicio_activa <= ? AND a.fecha_fin_activa >= ?)) "
                var cont = 0;
                var jsNow = new Date().getTime();
                params.push(jsNow); //para fecha activa
                params.push(jsNow);
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
                if (sessionFiltroTematica != -1 && cont < 2 && sessionFiltroTematica2 == -1) {//solo una tematica
                    where += " AND a.id = te.actividad AND te.tematica = ? "
                    from += ", actividad_tematica as te "
                    params.push(sessionFiltroTematica)
                    cont++;
                }
                if (sessionFiltroTematica2 != -1 && cont < 2) {//dos tematicas
                    where += " AND (a.id = te.actividad AND (te.tematica = ? OR te.tematica = ?))"
                    from += ", actividad_tematica as te "
                    params.push(sessionFiltroTematica)
                    params.push(sessionFiltroTematica2)
                    cont++;
                }
                if (sessionFiltroParticipantes != -1 && cont < 2) {
                    where += " AND a.id = pa.actividad AND pa.participante = ? "
                    from += ", actividad_participante as pa "
                    params.push(sessionFiltroParticipantes)
                    cont++;
                }
                if (sessionFiltroFecha != -1 && cont < 2) {
                    where += " AND (a.fecha_inicio_oficial) <= ? AND (a.fecha_fin_oficial) >= ?"
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
                console.log(consulta)
                tx.executeSql(consulta, params, function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
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
                    parsearListadoActividades(data1);
                    return data1;
                }, function (e) {
                    console.error(e.message)
                    console.error(e)
                }, function (e) {
                    console.error(e.message)
                    console.error(e)
                });
            });
        } else {
            var promesaRecurrentes = new Promise(function (tengoRecurrentes, errorRecurrentes) {
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM actividad_recurrencia', [], function (tx, results) {
                        var len = results.rows.length, i;
                        var data = [];
                        for (i = 0; i < len; i++) {
                            data.push({
                                id: results.rows.item(i).idActividad,
                                rule: results.rows.item(i).rule
                            })
                        }
                        tengoRecurrentes(data);
                    });
                }, function (e) {
                }, function (e) {
                    errorRecurrentes(e)
                });
            }); // fin de la promesa
            promesaRecurrentes.then(function (data) {//Cumplir la promesa
                var dia1 = new Date(sessionFiltroFecha);
                dia1.setHours(0);
                dia1.setMinutes(0);
                dia1.setSeconds(0);
                dia1.setMilliseconds(0);
                var arrayIdsRecurrentes = []
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var rule = data[i].rule;
                    var fechas = getFechasRecurrencia(rule)

                    for (var j = 0; j < fechas.length; j++) { //pasar a timestamp
                        fechas[j] = new Date(fechas[j]);
                        fechas[j].setHours(0);
                        fechas[j].setMinutes(0);
                        fechas[j].setSeconds(0);
                        fechas[j] = fechas[j].getTime();
                    }
                    if (fechas.indexOf(dia1.getTime()) >= 0 && arrayIdsRecurrentes.indexOf(id) == -1) { // lleno un array con los ids de actividades que cumplen por recurrencia
                        arrayIdsRecurrentes.push(id);
                    }
                }
                db.transaction(function (tx) { // en esta transaccion hay que juntar tambien los que cumplen con la recurrencia
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
                    var where = " WHERE (a.permanente = 'true' OR (a.fecha_inicio_activa <= ? AND a.fecha_fin_activa >= ?)) "
                    var cont = 0;
                    var jsNow = new Date().getTime();
                    params.push(jsNow); //para fecha activa
                    params.push(jsNow);
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
                    if (sessionFiltroParticipantes != -1 && cont < 2) {
                        where += " AND a.id = pa.actividad AND pa.participante = ? "
                        from += ", actividad_participante as pa "
                        params.push(sessionFiltroParticipantes)
                        cont++;
                    }
                    if (sessionFiltroFecha != -1 && cont < 2) {
                        where += " AND (((a.fecha_inicio_oficial <= ?) AND (a.fecha_fin_oficial >= ?) AND a.id NOT IN (SELECT idActividad FROM actividad_recurrencia)) "
                        params.push(sessionFiltroFecha)
                        params.push(sessionFiltroFecha)
                        cont++;
                        if (arrayIdsRecurrentes.length > 0) {
                            where += " OR a.id IN ("
                        }
                        for (var k = 0; k < arrayIdsRecurrentes.length; k++) {
                            where += " ?";
                            params.push(arrayIdsRecurrentes[k])
                            if (k < (arrayIdsRecurrentes.length - 1)) {
                                where += ",";
                            }
                        }
                        if (arrayIdsRecurrentes.length > 0) {
                            where += ")"
                        }
                        where += ") "
                    }
                    if (sessionFiltroEtiqueta != -1 && cont < 2) {
                        where += " AND a.id = et.actividad AND et.etiqueta = ? "
                        from += ", actividad_etiqueta as et "
                        params.push(sessionFiltroEtiqueta)
                        cont++;
                    }

                    var consulta = campos + from + where;
                    tx.executeSql(consulta, params, function (tx, results) {
                        var len = results.rows.length, i;
                        if (len * 1 == 0) {
                            //launchPop()
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
                        parsearListadoActividades(data1);
                        return data1;
                    }, function (e) {
                        console.error(e)
                    }, function (e) {
                        console.error(e)
                    });
                });
            }, function (error) { //fin del then de la promesa y comienzo del error
                console.error(error)
            })

        }//fin else para filtrado fechas
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectActividad(idAct) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                tx.executeSql('SELECT * FROM participante AS p, actividad_participante AS ap' +
                        ' WHERE p.id = ap.participante AND ap.actividad = ?', [idAct], function (tx, resultsP) {
                    var len = resultsP.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
                    }
                    var dataP = [];
                    for (i = 0; i < len; i++) {
                        dataP.push({
                            id: resultsP.rows.item(i).id,
                            descripcion: resultsP.rows.item(i).descripcion,
                            nombre: resultsP.rows.item(i).nombre,
                            urlImagen: resultsP.rows.item(i).url_thumbnail
                        })
                    }
                    var data1 = {actividad: data, participantes: dataP}
                    console.log(data1)
                    parsearActividad(data1);
                    return data1;
                })



            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoParticipantes() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            if (sessionFiltroEvento > -1) {
                tx.executeSql('SELECT p.id AS id, p.descripcion AS descripcion, p.nombre AS nombre, p.url_thumbnail AS url_imagen'
                        + ' FROM participante AS p, actividad_evento AS ae, actividad_participante AS ap '
                        + ' WHERE p.id = ap.participante AND ap.actividad = ae.actividad AND ae.evento = ?',
                        [sessionFiltroEvento], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlThumbnail: results.rows.item(i).url_thumbnail,
                            nombre: results.rows.item(i).nombre,
                            descripcion: results.rows.item(i).descripcion
                        })
                    }
                    parsearListadoParticipantes(data);
                    return data;
                });
            } else if (sessionFiltroEtiqueta > -1) {
                tx.executeSql('SELECT p.id AS id, p.descripcion AS descripcion, p.nombre AS nombre, p.url_thumbnail AS url_imagen'
                        + ' FROM participante AS p, actividad_etiqueta AS ae, actividad_participante AS ap '
                        + ' WHERE p.id = ap.participante AND ap.actividad = ae.actividad AND ae.etiqueta = ?', [sessionFiltroEtiqueta], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop() 
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlThumbnail: results.rows.item(i).url_thumbnail,
                            nombre: results.rows.item(i).nombre,
                            descripcion: results.rows.item(i).descripcion
                        })
                    }
                    parsearListadoParticipantes(data);
                    return data;
                });
            } else if (sessionFiltroLugar > -1) {
                tx.executeSql('SELECT p.id AS id, p.descripcion AS descripcion, p.nombre AS nombre, p.url_thumbnail AS url_imagen'
                        + ' FROM participante AS p, actividad_participante AS ap, actividad AS a '
                        + ' WHERE p.id = ap.participante AND ap.actividad = a.id AND a.lugar_id = ?',
                        [sessionFiltroLugar], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop() 
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlThumbnail: results.rows.item(i).url_thumbnail,
                            nombre: results.rows.item(i).nombre,
                            descripcion: results.rows.item(i).descripcion
                        })
                    }
                    parsearListadoParticipantes(data);
                    return data;
                });
            } else {
                tx.executeSql('SELECT p.id AS id, p.descripcion AS descripcion, p.nombre AS nombre, p.url_thumbnail AS url_imagen'
                        + ' FROM participante AS p',
                        [], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop() 
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlThumbnail: results.rows.item(i).url_thumbnail,
                            nombre: results.rows.item(i).nombre,
                            descripcion: results.rows.item(i).descripcion
                        })
                    }
                    parsearListadoParticipantes(data);
                    return data;
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoTematicas() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            if (sessionFiltroEvento != -1) {
                tx.executeSql('SELECT DISTINCT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                        ' FROM tematica as t, actividad_tematica as at, actividad_evento as ae ' +
                        ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.evento = ?', [sessionFiltroEvento], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
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
                        //launchPop()
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
            } else if (sessionFiltroParticipantes != -1) {
                tx.executeSql('SELECT t.id as id, t.url_imagen as url_imagen, t.nombre as nombre, t.color as color ' +
                        ' FROM tematica as t, actividad_tematica as at, actividad_participante as ae ' +
                        ' WHERE t.id = at.tematica AND at.actividad = ae.actividad AND ae.participante = ?', [sessionFiltroParticipantes], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
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
                    return data;
                });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectNomenclaturaMenu() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                parsearMenuLateral(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectLugarPorId() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM lugar AS l WHERE l.id = ?", [sessionFiltroLugar], function (tx, results) {
                var len = results.rows.length, i;
                if (len * 1 == 0) {
                    //launchPop()
                }
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        urlImagen: results.rows.item(i).urlImagen,
                        nombre: results.rows.item(i).nombre,
                        descripcion: results.rows.item(i).descripcion
                    })
                }
                parsearDetalleLugar(data);
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

function selectListadoLugares() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            if (sessionFiltroEvento > -1) {//disctinct para evitar se dupliquen registros mostrados
                tx.executeSql('SELECT DISTINCT l.id AS id,' +
                        ' l.urlImagen AS url_imagen,' +
                        ' l.nombre AS nombre ' +
                        ' FROM lugar AS l,' +
                        ' actividad AS a,' +
                        ' actividad_evento AS ae ' +
                        ' WHERE l.id = a.lugar_id AND a.id = ae.actividad AND ae.evento = ?', [sessionFiltroEvento], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre
                        })
                    }
                    parsearListadoLugares(data);
                    return data;
                });
            } else if (sessionFiltroTematica > -1) {//disctinct para evitar se dupliquen registros mostrados
                tx.executeSql('SELECT DISTINCT l.id AS id,' +
                        ' l.urlImagen AS url_imagen,' +
                        ' l.nombre AS nombre ' +
                        ' FROM lugar AS l,' +
                        ' actividad AS a,' +
                        ' actividad_tematica AS at ' +
                        ' WHERE l.id = a.lugar_id AND a.id = at.actividad AND at.tematica = ?', [sessionFiltroTematica], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).url_imagen,
                            nombre: results.rows.item(i).nombre
                        })
                    }
                    parsearListadoLugares(data);
                    return data;
                });
            } else {
                tx.executeSql("SELECT * FROM lugar WHERE id != '0'", [], function (tx, results) {
                    var len = results.rows.length, i;
                    if (len * 1 == 0) {
                        //launchPop()
                    }
                    var data = [];
                    for (i = 0; i < len; i++) {
                        data.push({
                            id: results.rows.item(i).id,
                            urlImagen: results.rows.item(i).urlImagen,
                            nombre: results.rows.item(i).nombre
                        })
                    }
                    parsearListadoLugares(data);
                    return data;
                });
            }
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*funcion que devuelve el listado de recursivas*/
function selectListadoRecursivas() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM actividad_recurrencia', [], function (tx, results) {
                var len = results.rows.length, i;
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).id,
                        rule: results.rows.item(i).rule
                    })
                }
                return data;
            });
        });
    } catch (e) {
    }/*no admite almacenamiento IE, FF*/
}

/*funcion que devuelve el listado de fechas de actividades no permanente ni recurrentes*/
function selectListadoFechasNormales() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    try {
        db.transaction(function (tx) {
            tx.executeSql('SELECT a.fecha_inicio_oficial AS fio, a.fecha_fin_oficial AS ffo ' +
                    ' FROM actividad as a ' +
                    ' WHERE fecha_inicio_activa <= ? AND fecha_fin_activa >= ? ' +
                    ' AND a.id NOT IN (SELECT idActividad FROM actividad_recurrencia)', [new Date().getTime(), new Date().getTime()], function (tx, results) {
                var len = results.rows.length, i;
                var data = [];
                for (i = 0; i < len; i++) {
                    var fechasEntre = getFechasEntreFechas(results.rows.item(i).fio, results.rows.item(i).ffo);
                    if (data == []) {
                        data = fechasEntre
                    } else {
                        data = combinarArrays(data, fechasEntre);
                    }
                }
                return data;
            });
        });
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}

function selectDiasConActividad(mes, anno) {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    mes = mes - 1;
    var promesaRecurrentes = new Promise(function (tengoRecurrentes, errorRecurrentes) {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM actividad_recurrencia', [], function (tx, results) {
                var len = results.rows.length, i;
                var data = [];
                for (i = 0; i < len; i++) {
                    data.push({
                        id: results.rows.item(i).idActividad,
                        rule: results.rows.item(i).rule
                    })
                }
                tengoRecurrentes(data);
            });
        }, function (e) {
        }, function (e) {
            errorRecurrentes(e)
        });
    }); // fin de la promesa
    promesaRecurrentes.then(function (dataR) {//Cumplir la promesa
        var arrayRecurrentes = getArrayFechasRecurrentes(dataR)
        for (var j = 0; j < arrayRecurrentes.length; j++) {
            var dia1 = new Date(arrayRecurrentes[j]);
            dia1.setHours(0);
            dia1.setMinutes(0);
            dia1.setSeconds(0);
            dia1.setMilliseconds(0);
            arrayRecurrentes[j] = dia1.getTime()
        }
        var promesaNormales = new Promise(function (tengoNormales, errorNormales) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT a.fecha_inicio_oficial AS fio, a.fecha_fin_oficial AS ffo ' +
                        ' FROM actividad as a ' +
                        ' WHERE fecha_inicio_activa <= ? AND fecha_fin_activa >= ? ' +
                        ' AND a.id NOT IN (SELECT idActividad FROM actividad_recurrencia) ' +
                        " AND a.permanente = 'false'", [new Date().getTime(), new Date().getTime()], function (tx, results) {
                    var len = results.rows.length, i;
                    var data = [];
                    for (i = 0; i < len; i++) {
                        var fechasEntre = getFechasEntreFechas(results.rows.item(i).fio, results.rows.item(i).ffo);
                        if (data == []) {
                            data = fechasEntre
                        } else {
                            data = combinarArrays(data, fechasEntre);
                        }
                    }
                    tengoNormales(data);
                }, function (e) {
                }, function (e) {
                    errorNormales(e)
                });
            });
        }); // fin promes normales
        promesaNormales.then(function (dataN) {
            var fechasTodas = combinarArrays(dataN, arrayRecurrentes);
            var promesaPermanentes = new Promise(function (tengoPermanentes, errorPermanentes) {
                db.transaction(function (tx) {
                    tx.executeSql('SELECT id ' +
                            ' FROM actividad ' +
                            " WHERE permanente = 'true'", [], function (tx, results) {
                        var len = results.rows.length, i;
                        tengoPermanentes(len);
                    }, function (e) {
                    }, function (e) {
                        errorPermanentes(e)
                    });
                });
            }); // fin promes normales
            promesaPermanentes.then(function (dataP) {
                var diferencia = getDiasDiferencia(fechasTodas[0], fechasTodas[fechasTodas.length - 1])
                var tipo = 1;
                if (diferencia > 40) {
                    tipo = 2;
                }
                var hayPermanente = false;
                if (dataP > 0) {
                    hayPermanente = true;
                }
                var fechasLimpiasMesAno = getRecurrentesPorMes(mes, anno, fechasTodas)
                var salidaJson = {
                    fechas: fechasLimpiasMesAno,
                    tipo: tipo + '',
                    haypermanente: hayPermanente
                }
                pintaDiasConActividad(salidaJson)
                $("#filtroCalendario").datepicker();
            })
        })
    })
}

function createBBDD() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
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
                    'hora_fin_oficial,' +
                    'hora_inicio_oficial,' +
                    'lugar_busqueda_id,' +
                    'lugar_evento_id,' +
                    'nombre,' +
                    'permanente,' +
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
            /*meta data*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS metadata (' +
                    'id unique, ' +
                    'tipoFecha, ' +
                    'mostrarParticipantes' +
                    ')')
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
                    'urlImagen,' +
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
                    'idAct,' +
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
            /*nomenclatura actividad*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS nomenclatura_actividad (id unique, nombre, nombreApp, idActividad)');
            /*recurrencia de la actividad*/
            tx.executeSql('CREATE TABLE IF NOT EXISTS actividad_recurrencia (idActividad unique, rule)');
        });
    } catch (e) {
        console.error(e)
    }/*no admite almacenamiento IE, FF*/
}


/*BORRADOS DE LIMPIEZA*/
function limpiezaActividades() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var jsNow = new Date().getTime();
        var consulta = 'DELETE FROM actividad ' +
                'WHERE fecha_fin_activa < ?';
        tx.executeSql(consulta, [jsNow], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaRelaciones() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_etiqueta ' +
                ' WHERE actividad NOT IN (SELECT id FROM actividad) ' +
                ' OR etiqueta NOT IN (SELECT id FROM etiqueta)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
        consulta = 'DELETE FROM actividad_evento ' +
                ' WHERE actividad NOT IN (SELECT id FROM actividad) ' +
                ' OR evento NOT IN (SELECT id FROM evento)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
        consulta = 'DELETE FROM actividad_participante ' +
                ' WHERE actividad NOT IN (SELECT id FROM actividad) ' +
                ' OR participante NOT IN (SELECT id FROM participante)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
        consulta = 'DELETE FROM actividad_recurrencia ' +
                ' WHERE idActividad NOT IN (SELECT id FROM actividad) ';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
        consulta = 'DELETE FROM actividad_tematica ' +
                ' WHERE actividad NOT IN (SELECT id FROM actividad) ' +
                ' OR tematica NOT IN (SELECT id FROM tematica)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaEtiquetas() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM etiqueta ' +
                'WHERE id NOT IN (SELECT etiqueta FROM actividad_etiqueta)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaBanners() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM banner ' +
                'WHERE (idEve NOT IN (SELECT id FROM evento)' +
                " AND idAct = '-1') " +
                " OR (idAct NOT IN (SELECT id FROM actividad)" +
                " AND idEve ='-1')";
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaEventos() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var jsNow = new Date().getTime()
        var consulta = 'DELETE FROM evento ' +
                'WHERE id NOT IN (SELECT evento FROM actividad_evento)' +
                " OR (fecha_fin_activa < ? " +
                " AND permanente = 'false')";
        tx.executeSql(consulta, [jsNow], function (i) {
            console.info("LIMPIEZA DE EVENTOS")
            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaEventos1a1() {
    console.error("LIMPIEZA EVENTOS 1 A 1")
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var jsNow
        var consulta = 'DELETE FROM evento ' +
                'WHERE id != a';
        tx.executeSql(consulta, function (i) {
            console.info(i)
        }, function (e) {
            console.error(e)
        });
    });
}
function limpiezaLugares() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM lugar ' +
                'WHERE id NOT IN (SELECT lugar_id FROM actividad)' +
                ' AND id NOT IN (SELECT lugar_busqueda_id FROM evento)' +
                ' AND id NOT IN (SELECT lugar_evento_id FROM evento) ';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaParticipantes() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM participante ' +
                'WHERE id NOT IN (SELECT participante FROM actividad_participante)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaPatrocinadores() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM patrocinador ' +
                'WHERE idEve NOT IN (SELECT id FROM evento)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaTematicas() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM tematica ' +
                'WHERE id NOT IN (SELECT tematica FROM actividad_tematica)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}
function limpiezaRecurrencias() {
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_recurrencia ' +
                'WHERE idActividad NOT IN (SELECT id FROM actividad)';
        tx.executeSql(consulta, [], function (i) {
//            console.info(i)
        }, function (e) {
//            console.error(e)
        });
    });
}

/* llamada cada ejecucion para eliminar 
 * los elementos que por diversos motivos 
 * ya no tienen que estar en la BBDD */
(function () {
    limpiezaActividades()
    limpiezaRelaciones()
    limpiezaEtiquetas()
    limpiezaBanners()
    limpiezaEventos()
    limpiezaLugares()
    limpiezaParticipantes()
    limpiezaPatrocinadores()
    limpiezaTematicas()
    limpiezaRecurrencias()
})()

/*Limpiar tabla completa*/

/*var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
 db.transaction(function (tx) {
 var consulta = 'DELETE FROM tematica ' +
 'WHERE rowid = rowid';
 tx.executeSql(consulta, [], function (i) {
 }, function (e) {
 });
 });*/

function ereaseData() {
    console.warn("EREASE DATA")
    var db = window.openDatabase("localDB", "1.0", "localDB", 50 * 1024 * 1024);
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_etiqueta ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_evento ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_participante ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_recurrencia ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM actividad_tematica ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM banner ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM etiqueta ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM evento ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM lugar ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM metadata ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM nomenclatura_actividad ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM nomenclatura_menu ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM participante ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM patrocinador ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
    db.transaction(function (tx) {
        var consulta = 'DELETE FROM tematica ' +
                'WHERE rowid = rowid';
        tx.executeSql(consulta, [], function (i) {
        }, function (e) {
        });
    });
}