//post package
var formdata = new FormData();
formdata.append("backImage", fileInput.files[0], "/C:/Users/tamer/Downloads/backvip.png");
formdata.append("image", fileInput.files[0], "/C:/Users/tamer/Downloads/vip.png");
formdata.append("color", "#BE8E08");
formdata.append("advantages", "60649ddeb0cccf27648306a2 60649e51b0cccf27648306a3");
formdata.append("offers", "6064974ab0cccf276483069d 60649768b0cccf276483069e 60649775b0cccf276483069f");
formdata.append("enName", "VIP For Individuals");
formdata.append("enType", "Individuals");
formdata.append("enDescription", "This package is customized to suit individual requirements, to ensure the best possible experience");
formdata.append("enPrice", "95");
formdata.append("enCurrency", "SR");
formdata.append("arName", "VIP للافراد");
formdata.append("arType", "الافراد");
formdata.append("arDescription", "تم تخصيص هذه الباقة لكي تلائم متطلبات الأفراد، حرصا منّا للحصول على أفضل تجربة ممكنة");
formdata.append("arPrice", "95");
formdata.append("arCurrency", "ريال");

var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
};

fetch("https://stockcardsbackend.herokuapp.com/api/v1/packages", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));



{
    "sectors": [{
        "$oid": "604e132129918d2348b237fd"
    }, {
        "$oid": "604e132129918d2348b237fd"
    }],
        "occasions": [{
            "$oid": "604e12d729918d2348b237fc"
        }, {
            "$oid": "604e12d729918d2348b237ff"
        }],
            "packages": [{
                "$oid": "604e10328c09c54850029bfb"
            }, {
                "$oid": "604e10328c09c54850029bfb"
            }],
                "color": "#FF0000",
                    "price": {
        "$numberInt": "5050"
    },
    "image": "https://res.cloudinary.com/gallarycloud/image/upload/v1625313599/nwovwbkjhfrpzsqdjhll.jpg",
        "type": "new",
            "width": {
        "$numberInt": "4756"
    },
    "height": {
        "$numberInt": "2675"
    },
    "enname": "eid om",
        "arname": "ramadan karim",
            "sale": {
        "$numberInt": "50"
    },
    "components": [{
        "style": {
            "position": "absolute",
            "height": {
                "$numberDouble": "2675"
            },
            "width": {
                "$numberDouble": "4756"
            },
            "transform": [{
                "translateX": {
                    "$numberDouble": "0"
                }
            }, {
                "translateY": {
                    "$numberDouble": "0"
                }
            }, {
                "rotate": "0deg"
            }, {
                "rotateX": "0deg"
            }, {
                "rotateY": "0deg"
            }, {
                "scaleX": {
                    "$numberInt": "1"
                }
            }, {
                "scaleY": {
                    "$numberInt": "1"
                }
            }]
        },
        "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625230013/rexzxcnslfj2t4n4bqrq.png"
    }, {
        "style": {
            "position": "absolute",
            "height": {
                "$numberInt": "1083"
            },
            "width": {
                "$numberInt": "230"
            },
            "transform": [{
                "translateX": {
                    "$numberInt": "876"
                }
            }, {
                "translateY": {
                    "$numberInt": "-379"
                }
            }, {
                "rotate": "0deg"
            }, {
                "rotateX": "0deg"
            }, {
                "rotateY": "0deg"
            }, {
                "scaleX": {
                    "$numberInt": "1"
                }
            }, {
                "scaleY": {
                    "$numberInt": "1"
                }
            }]
        },
        "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166721/rmz4n2lwieyd8pza83c3.png"
    }, {
        "style": {
            "position": "absolute",
            "height": {
                "$numberInt": "1083"
            },
            "width": {
                "$numberInt": "230"
            },
            "transform": [{
                "translateX": {
                    "$numberInt": "4011"
                }
            }, {
                "translateY": {
                    "$numberInt": "0"
                }
            }, {
                "rotate": "0deg"
            }, {
                "rotateX": "0deg"
            }, {
                "rotateY": "0deg"
            }, {
                "scaleX": {
                    "$numberInt": "1"
                }
            }, {
                "scaleY": {
                    "$numberInt": "1"
                }
            }]
        },
        "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166752/sj8dtoycunokke3mqoth.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1503"
                },
                "width": {
                    "$numberInt": "230"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "2300"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "-13"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
            "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166752/sj8dtoycunokke3mqoth.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "391"
                },
                "width": {
                    "$numberInt": "390"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "1307"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "46"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166747/c25htuwx3dmkbevbovnk.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "391"
                },
                "width": {
                    "$numberInt": "390"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "4241"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "1814"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
            "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166747/c25htuwx3dmkbevbovnk.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1436"
                },
                "width": {
                    "$numberInt": "290"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "3723"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "-13"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625168006/dfuzcuaqhvxjbtk5aw5g.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1436"
                },
                "width": {
                    "$numberInt": "290"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "1083"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "-477"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
            "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625168006/dfuzcuaqhvxjbtk5aw5g.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1825"
                },
                "width": {
                    "$numberInt": "2060"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "1348"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "185"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166802/e5lwmcjycovfqt3kj7db.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "910"
                },
                "width": {
                    "$numberInt": "3187.36"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "865.83"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "1748.16"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166759/lmwkhgbkuonggxiyz8io.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "478"
                },
                "width": {
                    "$numberInt": "566"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "3366"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "1895"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625168026/c8mmpcrcohwdez4l5ktd.png"
        }, {
        "style": {
            "position": "absolute",
            "width": {
                "$numberInt": "434.28"
            },
            "height": {
                "$numberInt": "202.48"
            },
            "textAlign": "center",
            "fontSize": {
                "$numberInt": "24.25"
            },
                "color": "#fbb329",
            "transform": [{
                "translateX": {
                    "$numberDouble": "2235.21"
                }
            }, {
                "translateY": {
                    "$numberDouble": "1417.82"
                }
            }, {
                "rotate": "0deg"
            }, {
                "rotateX": "0deg"
            }, {
                "rotateY": "0deg"
            }, {
                "scaleX": {
                    "$numberInt": "1"
                }
            }, {
                "scaleY": {
                    "$numberInt": "1"
                }
            }]
        },
        "type": "text",
        "text": "kareem"
        }, {
            "style": {
                "position": "absolute",
                "width": {
                    "$numberInt": "1186"
                },
                "height": {
                    "$numberInt": "264"
                },
                "textAlign": "center",
                "fontSize": {
                    "$numberInt": "68.97"
                },
                "color": "#ffffff",
                "transform": [{
                    "translateX": {
                        "$numberDouble": "1868"
                    }
                }, {
                    "translateY": {
                        "$numberDouble": "1130"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "text",
            "text": "Ramadhan"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1438"
                },
                "width": {
                    "$numberInt": "708"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "4395"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "-35"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625314895/igcayqjtumhfeypaaql9.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "1438"
                },
                "width": {
                    "$numberInt": "708"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "-245"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "-35"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166822/nr4mltkacezqzn3glyic.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "571"
                },
                "width": {
                    "$numberInt": "1465"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "1718"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "523"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625315591/cjxusndmthjjg1vgkrx1.png"
        }, {
            "style": {
                "position": "absolute",
                "height": {
                    "$numberInt": "368"
                },
                "width": {
                    "$numberInt": "2248"
                },
                "transform": [{
                    "translateX": {
                        "$numberInt": "961"
                    }
                }, {
                    "translateY": {
                        "$numberInt": "1826"
                    }
                }, {
                    "rotate": "0deg"
                }, {
                    "rotateX": "0deg"
                }, {
                    "rotateY": "0deg"
                }, {
                    "scaleX": {
                        "$numberInt": "1"
                    }
                }, {
                    "scaleY": {
                        "$numberInt": "1"
                    }
                }]
            },
            "type": "image",
        "uri": "https://res.cloudinary.com/gallarycloud/image/upload/v1625166811/uobpoziapw4evutfzsrp.png"
        }]
}

.ابعث_سلامي_مع_الطير_واسبق_الكل__والغير_وأقولك: _ {
    font - size: 50px;
    font - family: "Noor";
    color: rgb(255, 255, 255);
    font - weight: bold;
    line - height: 0.54;
    text - shadow: 14.142px 14.142px 22.4px rgba(0, 0, 0, 0.28);
    -moz - transform: matrix(10.0206873049467, 0, 0, 10.0206873049467, 0, 0);
    -webkit - transform: matrix(10.0206873049467, 0, 0, 10.0206873049467, 0, 0);
    -ms - transform: matrix(10.0206873049467, 0, 0, 10.0206873049467, 0, 0);
    position: absolute;
    left: 2075.117px;
    top: 2433.587px;
    z - index: 34;
}


