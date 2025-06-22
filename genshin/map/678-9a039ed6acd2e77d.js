"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[678], {
    2499: function(e, t, n) {
        var r = n(5893)
            , s = n(7294)
            , i = n(5237)
            , a = n(2719)
            , l = n(8689);
        let o = {
            "320x50": [["320", "50"]],
            "320x100": [["320", "100"]],
            "300x250": [["300", "250"]]
        };
        t.Z = (0,
            s.memo)(e => {
                let {placement: t, devices: n, size: c} = e
                    , d = "pc-".concat(t, "-").concat(c, "-").concat(a.lw)
                    , m = c.split("x").map(Number);
                return (0,
                    s.useEffect)( () => {
                        if ((0,
                            i.jU)()) {
                            let e = setTimeout( () => {
                                    try {
                                        (0,
                                            i.u9)() || window.nitroAds.createAd(d, {
                                            demo: !1,
                                            refreshLimit: 0,
                                            refreshTime: 30,
                                            renderVisibleOnly: !0,
                                            refreshVisibleOnly: !0,
                                            sizes: o[c],
                                            mediaQuery: (0,
                                                l.aK)(n)
                                        })
                                    } catch (e) {
                                        return
                                    }
                                }
                                , 200);
                            return () => window.clearTimeout(e)
                        }
                    }
                    , []),
                    (0,
                        r.jsx)("div", {
                        id: d,
                        style: {
                            display: "block",
                            width: m[0] + "px",
                            height: m[1] + "px",
                            lineHeight: 0,
                            backgroundColor: "rgba(0,0,0,0.1)",
                            margin: "0 auto"
                        }
                    })
            }
        )
    },
    7340: function(e, t, n) {
        var r = n(5893)
            , s = n(7294)
            , i = n(5237)
            , a = n(2719);
        let l = "mobi-b-320x50-".concat(a.lw);
        t.Z = (0,
            s.memo)( () => ((0,
            s.useEffect)( () => {
                if ((0,
                    i.jU)()) {
                    let e = setTimeout( () => {
                            try {
                                (0,
                                    i.u9)() || window.nitroAds.createAd(l, {
                                    demo: !1,
                                    refreshLimit: 0,
                                    refreshTime: 30,
                                    renderVisibleOnly: !0,
                                    refreshVisibleOnly: !0,
                                    sizes: [["320", "50"]],
                                    mediaQuery: "(min-width: 320px) and (max-width: 767px)"
                                })
                            } catch (e) {
                                return
                            }
                        }
                        , 200);
                    return () => window.clearTimeout(e)
                }
            }
            , []),
            (0,
                r.jsx)("div", {
                style: {
                    lineHeight: 0
                },
                children: (0,
                    r.jsx)("div", {
                    id: l,
                    style: {
                        display: "inline-block",
                        width: "320px",
                        height: "auto",
                        lineHeight: 0
                    }
                })
            })))
    },
    992: function(e, t, n) {
        var r = n(5893)
            , s = n(7294)
            , i = n(5237)
            , a = n(2719)
            , l = n(8689);
        t.Z = (0,
            s.memo)(e => {
                let {placement: t, devices: n} = e
                    , o = "pc-".concat(t, "-nc-").concat(a.lw);
                return console.log("DIV_ID", o),
                    (0,
                        s.useEffect)( () => {
                            if ((0,
                                i.jU)()) {
                                let e = setTimeout( () => {
                                        try {
                                            (0,
                                                i.u9)() || window.nitroAds.createAd(o, {
                                                format: "video-nc",
                                                mediaQuery: (0,
                                                    l.aK)(n),
                                                video: {
                                                    float: "never",
                                                    mobile: "compact",
                                                    hidePlaylist: !0
                                                },
                                                skipBidders: ["google"]
                                            })
                                        } catch (e) {
                                            return
                                        }
                                    }
                                    , 200);
                                return () => window.clearTimeout(e)
                            }
                        }
                        , []),
                    (0,
                        r.jsx)("div", {
                        id: o,
                        style: {
                            display: "block",
                            width: "320px",
                            height: "185px"
                        }
                    })
            }
        )
    },
    188: function(e, t, n) {
        var r = n(5893)
            , s = n(7294)
            , i = n(5237)
            , a = n(2719)
            , l = n(8689);
        t.Z = (0,
            s.memo)(e => {
                let {placement: t, devices: n} = e
                    , o = "pc-".concat(t, "-float-").concat(a.lw);
                return console.log("DIV_ID", o),
                    (0,
                        s.useEffect)( () => {
                            if ((0,
                                i.jU)()) {
                                let e = setTimeout( () => {
                                        try {
                                            (0,
                                                i.u9)() || window.nitroAds.createAd(o, {
                                                refreshTime: 30,
                                                format: "floating",
                                                mediaQuery: (0,
                                                    l.aK)(n),
                                                geoDeny: ["CN"]
                                            })
                                        } catch (e) {
                                            return
                                        }
                                    }
                                    , 200);
                                return () => window.clearTimeout(e)
                            }
                        }
                        , []),
                    (0,
                        r.jsx)("div", {
                        id: o,
                        style: {
                            display: "block",
                            width: "320px",
                            height: "185px"
                        }
                    })
            }
        )
    },
    4152: function(e, t, n) {
        let r;
        n.d(t, {
            Xt: function() {
                return S
            },
            qg: function() {
                return N
            }
        });
        var s = n(5893)
            , i = n(7294)
            , a = n(5861)
            , l = n(1057)
            , o = n(6242)
            , c = n(4267)
            , d = n(1903)
            , m = n(8462)
            , u = n(7212)
            , p = n(8885)
            , h = n(9334)
            , x = n(2023)
            , g = n(888)
            , j = n(244)
            , y = n(7937)
            , v = n(1208)
            , f = n(5084)
            , w = n(5089)
            , b = n(4721)
            , Z = n(8618)
            , k = n(9813)
            , C = n(6652)
            , T = n(2719);
        let N = 1
            , S = 3;
        t.ZP = e => {
            var t;
            let {email: n, uid: I} = e
                , G = (0,
                    C.TL)()
                , [_,M] = (0,
                    i.useState)(r)
                , z = null == _ ? void 0 : null === (t = _.invitees[0]) || void 0 === t ? void 0 : t.timestamp
                , L = (null == _ ? void 0 : _.inviteesCount) || 0
                , A = (null == _ ? void 0 : _.referrerId) ? "".concat("https://genshin-impact-map.appsample.com", "/?r=").concat(null == _ ? void 0 : _.referrerId) : "Loading..."
                , P = e => {
                    G((0,
                        k.bC)("/referral/" + e))
                }
            ;
            return (0,
                i.useEffect)( () => {
                    n && void 0 === r && (r = null,
                        (0,
                            Z.Tq)(n, I).then(e => {
                                let {data: t} = e;
                                M(t.data),
                                    r = t.data
                            }
                        ).catch(e => console.error(e)))
                }
                , [n, I]),
                (0,
                    s.jsxs)(o.Z, {
                    variant: "elevation",
                    elevation: 0,
                    sx: {
                        backgroundColor: "#e6e6e6",
                        my: 2
                    },
                    children: [(0,
                        s.jsxs)(c.Z, {
                        sx: {
                            py: 0,
                            textAlign: "center"
                        },
                        children: [(0,
                            s.jsx)(a.Z, {
                            variant: "body1",
                            sx: {
                                my: 2
                            },
                            children: "Invite friends to try out this map to enter for a chance to win $10-100 USD, EVERY DAY!"
                        }), (0,
                            s.jsx)(d.Z, {
                            label: "Your referral link",
                            value: A,
                            variant: "outlined",
                            size: "small",
                            fullWidth: !0,
                            inputProps: {
                                sx: {
                                    fontSize: "0.75rem"
                                }
                            },
                            onFocus: e => e.target.select(),
                            sx: {
                                backgroundColor: "rgba(255,255,255,0.3)"
                            },
                            color: "primary"
                        }), (0,
                            s.jsxs)(m.Z, {
                            dense: !0,
                            children: [(0,
                                s.jsxs)(u.ZP, {
                                disableGutters: !0,
                                divider: !0,
                                secondaryAction: L > 10 ? "10+" : L,
                                children: [(0,
                                    s.jsx)(p.Z, {
                                    sx: {
                                        mr: 1
                                    },
                                    children: (0,
                                        s.jsx)(y.Z, {})
                                }), (0,
                                    s.jsx)(h.Z, {
                                    primary: "Total invitations (2023Q2)"
                                })]
                            }), (0,
                                s.jsxs)(u.ZP, {
                                disableGutters: !0,
                                divider: !0,
                                secondaryAction: z ? Math.floor((new Date().getTime() - z) / 1e3 / 86400) + " days ago" : "Never",
                                children: [(0,
                                    s.jsx)(p.Z, {
                                    sx: {
                                        mr: 1
                                    },
                                    children: (0,
                                        s.jsx)(v.Z, {})
                                }), (0,
                                    s.jsx)(h.Z, {
                                    primary: "Last successful invitation"
                                })]
                            }), (0,
                                s.jsxs)(u.ZP, {
                                disableGutters: !0,
                                divider: !0,
                                secondaryAction: "".concat(L > 1 ? 1 : L, " / 3"),
                                children: [(0,
                                    s.jsx)(p.Z, {
                                    sx: {
                                        mr: 1
                                    },
                                    children: L >= N ? (0,
                                        s.jsx)(g.Z, {
                                        color: "success"
                                    }) : (0,
                                        s.jsx)(j.Z, {})
                                }), (0,
                                    s.jsx)(h.Z, {
                                    primary: "Invite ".concat(N, " friends to win $10")
                                })]
                            }), (0,
                                s.jsxs)(u.ZP, {
                                disableGutters: !0,
                                divider: !0,
                                secondaryAction: "".concat(L > 3 ? 3 : L, " / 3"),
                                children: [(0,
                                    s.jsx)(p.Z, {
                                    sx: {
                                        mr: 1
                                    },
                                    children: L >= S ? (0,
                                        s.jsx)(g.Z, {
                                        color: "success"
                                    }) : (0,
                                        s.jsx)(j.Z, {})
                                }), (0,
                                    s.jsx)(h.Z, {
                                    primary: "Invite ".concat(S, " friends to win $100")
                                })]
                            })]
                        })]
                    }), (0,
                        s.jsxs)(x.Z, {
                        sx: {
                            justifyContent: "space-between",
                            pt: 0
                        },
                        children: [(0,
                            s.jsx)(l.Z, {
                            variant: "text",
                            size: "small",
                            sx: {
                                textDecoration: "underline !important"
                            },
                            onClick: () => P("winners"),
                            startIcon: (0,
                                s.jsx)(w.Z, {}),
                            children: "View past winners"
                        }), (0,
                            s.jsx)(l.Z, {
                            variant: "text",
                            size: "small",
                            sx: {
                                textDecoration: "underline !important"
                            },
                            onClick: () => P("how-it-works"),
                            startIcon: (0,
                                s.jsx)(b.Z, {}),
                            children: "How it works"
                        }), (0,
                            s.jsx)(l.Z, {
                            variant: "text",
                            size: "small",
                            sx: {
                                textDecoration: "underline !important"
                            },
                            startIcon: (0,
                                s.jsx)(f.Z, {}),
                            href: "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent("Check out this " + T.bn.en.ui.brand + ", it's pretty helpful! " + A)),
                            target: "_blank",
                            children: "Share"
                        })]
                    }), (null == _ ? void 0 : _.isWinner) && (0,
                        s.jsxs)(c.Z, {
                        sx: {
                            py: 0,
                            textAlign: "center"
                        },
                        children: [(0,
                            s.jsx)("hr", {}), (0,
                            s.jsxs)(a.Z, {
                            variant: "body1",
                            sx: {
                                my: 2
                            },
                            children: ["Congrats, You are the winner! Please use your PayPal account to claim your ", (0,
                                s.jsx)("u", {
                                children: "$10"
                            }), " USD following the instructions below."]
                        }), (0,
                            s.jsx)("img", {
                            style: {
                                width: "100%"
                            },
                            src: "https://game-cdn.appsample.com/share/banners/paypal-request.jpg",
                            alt: "Paypal"
                        })]
                    })]
                })
        }
    },
    9678: function(e, t, n) {
        n.r(t),
            n.d(t, {
                default: function() {
                    return tD
                }
            });
        var r = n(5893)
            , s = n(9008)
            , i = n.n(s)
            , a = n(1057)
            , l = n(7294)
            , o = n(9626)
            , c = n(5615)
            , d = n(6652)
            , m = n(2719)
            , u = n(8386)
            , p = n(9791)
            , h = n(5616)
            , x = n(8456)
            , g = n(5173)
            , j = n(6543)
            , y = n(8689)
            , v = n(5237)
            , f = n(9813);
        let w = -1
            , b = new o.aN({
            apiKey: "",
            version: "3.59"
        });
        var Z = () => {
            let e = (0,
                l.useRef)(null)
                , [t,n] = (0,
                l.useState)(0)
                , s = (0,
                d.TL)()
                , i = (0,
                d.CG)(f.V_)
                , o = (0,
                d.CG)(c.g$)
                , Z = (0,
                d.CG)(c.fh)
                , k = (0,
                d.CG)(c.sT)
                , C = m.Gn[o];
            return (0,
                l.useEffect)( () => {
                    if (e.current) {
                        if (o === w)
                            return;
                        w = o,
                            u.Z.debug("useEffect()", "Map");
                        let t = Object.keys(g.gz).length ? Promise.resolve({}) : (0,
                            g.p2)().catch(e => (j.Z.increment100("map_init.error", {
                            marker: "rejected",
                            error: null == e ? void 0 : e.message
                        }),
                            console.error("marker data: 1st attempt failed", e),
                            null));
                        b.load().then( () => {
                                u.Z.debug("map init");
                                try {
                                    (0,
                                        g.df)(e.current, o, {
                                        zoom: (0,
                                            y.tq)() ? C.mobiZoom || C.minZoom || 10 : C.zoom || 11,
                                        restriction: {
                                            latLngBounds: C.bounds || {
                                                north: 1,
                                                south: -1,
                                                west: -1,
                                                east: 1
                                            },
                                            strictBounds: !1
                                        },
                                        center: (0,
                                            y.tq)() ? C.mobiCenter || {
                                            lat: .125,
                                            lng: 0
                                        } : C.center || {
                                            lat: 0,
                                            lng: 0
                                        },
                                        minZoom: C.minZoom || 10,
                                        maxZoom: C.maxZoom || 13,
                                        zoomSnap: C.zoomSnap,
                                        zoomDelta: C.zoomSnap,
                                        url: C.url
                                    }, C.overlays, C.patches)
                                } catch (e) {
                                    j.Z.increment("map_init.error", {
                                        create: "rejected",
                                        error: null == e ? void 0 : e.message
                                    })
                                }
                                (0,
                                    g.W5)({
                                    url: C.url || "",
                                    minZoom: C.minZoom || 10,
                                    maxZoom: C.maxZoom || 13,
                                    tileBounds: C.tileBounds
                                }),
                                    (0,
                                        g.Ys)(C.entrances);
                                let r = () => {
                                        s((0,
                                            f.K4)(!1));
                                        let e = Z || C.overlayPreSelect;
                                        if (e && ((0,
                                            g.Xc)(e),
                                            s((0,
                                                c.TK)(e))),
                                            (0,
                                                g.Rk)(Object.entries(k).filter(e => {
                                                    let[t,n] = e;
                                                    return n
                                                }
                                            ).map(e => e[0])),
                                            (0,
                                                v.jU)()) {
                                            let e = window.location.href.match(/&id=([0-9]+)/);
                                            e && e[1] && (0,
                                                g.dc)(e[1])
                                        }
                                        s((0,
                                            c.eY)(!0))
                                    }
                                ;
                                t.then(e => {
                                        if (u.Z.debug("markerDataPromise", e),
                                            e)
                                            r();
                                        else
                                            throw Error("No marker data")
                                    }
                                ).catch( () => {
                                        (0,
                                            g.p2)({
                                            useBackupUrl: !0
                                        }).then( () => {
                                                r(),
                                                    j.Z.increment100("map_init.recover")
                                            }
                                        ).catch(e => {
                                                n(2),
                                                    console.error("marker data: 2nd attempt failed", e)
                                            }
                                        )
                                    }
                                )
                            }
                        ).catch(e => {
                                n(1),
                                    j.Z.increment("map_init.error", {
                                        google: "rejected",
                                        error: null == e ? void 0 : e.message
                                    }),
                                    console.error(e)
                            }
                        )
                    }
                }
                , [e, o]),
                (0,
                    r.jsxs)(r.Fragment, {
                    children: [(0,
                        r.jsx)("div", {
                        className: "Map Map_".concat(m.lw, " Map_").concat("google"),
                        id: "mapDiv",
                        ref: e
                    }), i && (0,
                        r.jsx)(x.Z, {
                        sx: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            ml: "-1.5rem"
                        },
                        color: "info",
                        size: "3rem"
                    }), (0,
                        r.jsx)(p.Z, {
                        open: t > 0,
                        children: (0,
                            r.jsxs)(h.Z, {
                            textAlign: "center",
                            sx: {
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 320,
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4
                            },
                            children: [(0,
                                r.jsx)("h2", {
                                children: "\uD83D\uDEA8 Failed to load recources"
                            }), (0,
                                r.jsxs)("p", {
                                children: ["Sorry, something is wrong with the network(", t, ").", (0,
                                    r.jsx)("br", {}), "Please try again."]
                            }), (0,
                                r.jsx)("div", {
                                children: (0,
                                    r.jsx)(a.Z, {
                                    size: "large",
                                    variant: "contained",
                                    onClick: () => window.location.reload(),
                                    children: "Reload Page"
                                })
                            })]
                        })
                    })]
                })
        }
            , k = () => {
            let e = (0,
                d.CG)(f.BC)
                , t = (0,
                d.TL)()
                , n = () => t((0,
                f.bC)(null));
            return (0,
                r.jsx)(p.Z, {
                open: !!e,
                onClose: n,
                "aria-labelledby": "modal-modal-title",
                "aria-describedby": "modal-modal-description",
                children: (0,
                    r.jsxs)("div", {
                    style: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)"
                    },
                    children: [(0,
                        r.jsx)("div", {
                        children: e && (e.includes("imgur") || e.includes("appsample") ? (0,
                            r.jsx)("img", {
                            className: "imgur",
                            src: e,
                            alt: "media"
                        }) : (0,
                            r.jsx)("iframe", {
                            className: "youtube",
                            src: e
                        }))
                    }), (0,
                        r.jsx)("div", {
                        className: "p-3",
                        children: (0,
                            r.jsx)(a.Z, {
                            color: "primary",
                            variant: "contained",
                            fullWidth: !0,
                            onClick: n,
                            children: "Close"
                        })
                    })]
                })
            })
        }
            , C = n(813)
            , T = n(1398)
            , N = n(7340)
            , S = n(1251);
        function I() {
            let e = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0]
                , t = new Date().getTime()
                , n = S.cO.get("firstTimeVisit");
            if (!n)
                return e && S.cO.set("firstTimeVisit", t),
                    null;
            {
                let e = (t - Number(n)) / 1e3 / 86400;
                return e < 3600 / 86400 ? null : e > 10 ? 10 * Math.floor(e / 10) : e
            }
        }
        var G = n(2293)
            , _ = n(155)
            , M = n(5861)
            , z = n(4054)
            , L = n(8972)
            , A = n(315);
        let P = Object.keys(m.bn);
        var R = () => {
            let e = (0,
                d.CG)(f.KQ)
                , t = P.includes(e) ? e : "en"
                , n = (0,
                d.TL)();
            return (0,
                r.jsx)(r.Fragment, {
                children: (0,
                    r.jsx)(z.Z, {
                    variant: "standard",
                    color: "info",
                    size: "small",
                    sx: {
                        p: .25
                    },
                    children: (0,
                        r.jsx)(A.Z, {
                        labelId: "select-lang-label",
                        id: "select-lang",
                        value: t,
                        onChange: e => {
                            let t = e.target.value;
                            n((0,
                                f.Wg)(t)),
                                S.cO.set("lang", t),
                                j.Z.increment("lang.switch", {
                                    lang: t
                                })
                        }
                        ,
                        placeholder: "Select Language",
                        sx: {
                            backgroundColor: "rgba(255,255,255,0.5)",
                            pl: 1,
                            borderRadius: "0.25rem"
                        },
                        children: P.map(e => (0,
                            r.jsx)(L.Z, {
                            value: e,
                            children: m.bn[e].lang
                        }, e))
                    })
                })
            })
        }
            , E = n(4040)
            , D = (0,
            l.memo)( () => {
                let e = (0,
                    E.Z)();
                return (0,
                    r.jsx)(G.Z, {
                    position: "static",
                    children: (0,
                        r.jsxs)(_.Z, {
                        sx: {
                            flexGrow: 1,
                            justifyContent: "space-between",
                            minHeight: "3rem !important",
                            padding: "0 0.5rem 0 0.5rem !important"
                        },
                        children: [(0,
                            r.jsxs)(M.Z, {
                            variant: "h6",
                            noWrap: !0,
                            component: "h1",
                            title: "Home Page",
                            onClick: () => {
                                (0,
                                    v.jU)() && (window.top ? window.top.location.replace(m.GW) : window.location.replace(m.GW))
                            }
                            ,
                            sx: {
                                cursor: "pointer"
                            },
                            children: [(0,
                                r.jsx)("img", {
                                src: "".concat("https://game-cdn.appsample.com/gim", "/images/logo.png"),
                                alt: m.h5.title,
                                style: {
                                    width: "2rem",
                                    height: "2rem",
                                    verticalAlign: "bottom",
                                    borderRadius: "25%"
                                }
                            }), " ", e("ui.brand")]
                        }), (0,
                            r.jsx)("div", {
                            children: (0,
                                r.jsx)(R, {})
                        })]
                    })
                })
            }
        )
            , O = n(916)
            , F = n(44)
            , U = n(3497)
            , W = n(7078)
            , H = n(5398)
            , J = n(3927)
            , B = n(9294)
            , V = (0,
            l.memo)(e => {
                let {type: t, selected: n, text: s} = e
                    , i = (0,
                    d.TL)()
                    , l = (0,
                    r.jsx)("img", {
                    src: "".concat("https://game-cdn.appsample.com/gim", "/").concat("markers/{type}.png?v=1").replace("{type}", t),
                    loading: "lazy",
                    style: {
                        width: "2rem",
                        height: "2rem"
                    },
                    alt: s
                });
                return (0,
                    r.jsx)(a.Z, {
                    variant: "contained",
                    color: n ? "primary" : "info",
                    title: s,
                    sx: {
                        justifyContent: "center",
                        minWidth: "2em",
                        px: .25,
                        py: .25
                    },
                    onClick: () => {
                        i((0,
                            c.au)([t])),
                        n || j.Z.increment100("marker.click", {
                            action: "select",
                            type: t
                        })
                    }
                    ,
                    disableElevation: !0,
                    disableRipple: !0,
                    children: l
                })
            }
        )
            , q = n(4712)
            , K = n(502)
            , Q = (0,
            l.memo)(e => {
                var t;
                let {title: n, types: s, withText: i, withCount: l=!1} = e;
                u.Z.render("MarkerGroup");
                let o = (0,
                    d.CG)(c.sT)
                    , p = (0,
                    d.CG)(c.g$)
                    , x = (0,
                    d.TL)()
                    , j = (0,
                    E.Z)();
                return (0,
                    r.jsxs)("div", {
                    className: "MarkerGroup",
                    children: ["search" !== n && (0,
                        r.jsxs)("div", {
                        className: "d-flex align-items-center justify-content-between pb-1",
                        children: [(0,
                            r.jsx)("span", {
                            className: "uppercase text-gray",
                            children: j("category.".concat(n))
                        }), (0,
                            r.jsxs)("div", {
                            className: "MarkerActions text-right",
                            children: [!(null === (t = m.sp.noSelectAll) || void 0 === t ? void 0 : t.includes(n)) && (0,
                                r.jsx)(a.Z, {
                                variant: "text",
                                onClick: () => x((0,
                                    c.pO)({
                                    types: s,
                                    status: !0
                                })),
                                startIcon: (0,
                                    r.jsx)(q.Z, {
                                    color: "primary"
                                }),
                                children: j("ui.selectAll")
                            }), (0,
                                r.jsx)(a.Z, {
                                variant: "text",
                                onClick: () => x((0,
                                    c.pO)({
                                    types: s,
                                    status: !1
                                })),
                                startIcon: (0,
                                    r.jsx)(K.Z, {
                                    color: "primary"
                                }),
                                children: j("ui.clearAll")
                            })]
                        })]
                    }), (0,
                        r.jsx)(h.Z, {
                        sx: {
                            display: "grid",
                            pb: 1,
                            gap: .25,
                            gridTemplateColumns: i ? "repeat(2, 1fr)" : "repeat(8, 1fr)"
                        },
                        children: s.map(e => i ? (0,
                            r.jsx)(B.Z, {
                            type: e,
                            selected: o[e],
                            text: j("markers.".concat(e)),
                            count: m.sp.withCountCategory.includes(n) && l ? (0,
                                g.Ug)(p, e) : void 0
                        }, e) : (0,
                            r.jsx)(V, {
                            type: e,
                            selected: o[e],
                            text: j("markers.".concat(e))
                        }, e))
                    })]
                })
            }
        )
            , $ = n(3946)
            , Y = n(7109)
            , X = n(3841)
            , ee = n(7058)
            , et = n(6907)
            , en = n(2761)
            , er = () => {
            let[e,t] = (0,
                l.useState)("")
                , n = (0,
                d.TL)();
            return (0,
                r.jsxs)(z.Z, {
                variant: "outlined",
                size: "small",
                color: "primary",
                children: [(0,
                    r.jsx)(X.Z, {
                    htmlFor: "search-marker",
                    children: "Search"
                }), (0,
                    r.jsx)(ee.Z, {
                    id: "search-marker",
                    value: e,
                    onChange: e => {
                        let r = e.currentTarget.value.trim();
                        t(r);
                        let s = [];
                        r && (s = (0,
                            m.GN)(r)),
                            n((0,
                                c.x1)({
                                keyword: r || "",
                                result: s
                            }))
                    }
                    ,
                    onFocus: e => e.currentTarget.select(),
                    endAdornment: (0,
                        r.jsx)(Y.Z, {
                        position: "end",
                        children: (0,
                            r.jsx)($.Z, {
                            "aria-label": "toggle password visibility",
                            edge: "end",
                            onClick: () => {
                                e && (t(""),
                                    n((0,
                                        c.x1)({
                                        keyword: "",
                                        result: []
                                    })))
                            }
                            ,
                            children: e ? (0,
                                r.jsx)(et.Z, {}) : (0,
                                r.jsx)(en.Z, {})
                        })
                    }),
                    label: "Search",
                    sx: {
                        backgroundColor: "#fff",
                        color: "secondary.main"
                    }
                })]
            })
        }
            , es = n(1737)
            , ei = () => {
            let e = (0,
                d.CG)(c.Yt);
            return e.keyword ? 0 === e.result.length ? (0,
                r.jsx)(es.Z, {
                severity: "warning",
                sx: {
                    mb: 1
                },
                children: "Sorry, no search result."
            }) : (0,
                r.jsx)(Q, {
                title: "search",
                types: e.result,
                withText: !0,
                withCount: !0
            }) : null
        }
            , ea = n(8333)
            , el = n(5503)
            , eo = () => {
            let[e,t] = (0,
                    l.useState)(null)
                , n = (0,
                    d.CG)(c.g$)
                , s = (0,
                    d.TL)()
                , i = (0,
                    E.Z)()
                , o = !!e
                , u = () => t(null)
                , p = e => {
                    n !== e && s((0,
                        c.JJ)([Number(e)])),
                        u()
                }
            ;
            return (0,
                r.jsxs)("div", {
                children: [(0,
                    r.jsxs)(a.Z, {
                    id: "map-selector-btn",
                    variant: "outlined",
                    color: "primary",
                    "aria-controls": o ? "map-selector-menu" : void 0,
                    "aria-haspopup": "true",
                    "aria-expanded": o ? "true" : void 0,
                    onClick: e => {
                        t(e.currentTarget)
                    }
                    ,
                    endIcon: (0,
                        r.jsx)(el.Z, {}),
                    fullWidth: !0,
                    disableElevation: !0,
                    sx: {
                        height: "100%",
                        backgroundColor: "#fff"
                    },
                    title: "Switch Map",
                    children: [(0,
                        r.jsx)("img", {
                        style: {
                            height: "1.5em",
                            marginRight: "0.5em"
                        },
                        src: "".concat("https://game-cdn.appsample.com/gim", "/icons/map-").concat(n, ".png"),
                        alt: i("map.".concat(n))
                    }), (0,
                        r.jsx)("strong", {
                        className: "d-inline-block",
                        style: {
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "7em",
                            overflow: "hidden"
                        },
                        children: (0,
                            r.jsx)(M.Z, {
                            color: "secondary",
                            "data-testid": "map-selector-current",
                            children: i("map.".concat(n))
                        })
                    })]
                }), (0,
                    r.jsx)(ea.Z, {
                    id: "map-selector-menu",
                    anchorEl: e,
                    open: o,
                    onClose: u,
                    MenuListProps: {
                        "aria-labelledby": "map-selector-btn"
                    },
                    children: Object.keys(m.Fe).map(e => (0,
                        r.jsxs)(L.Z, {
                        onClick: () => p(Number(e)),
                        children: [(0,
                            r.jsx)("img", {
                            style: {
                                height: "1.5em",
                                marginRight: "0.5em"
                            },
                            src: "".concat("https://game-cdn.appsample.com/gim", "/icons/map-").concat(e, ".png"),
                            alt: i("map.".concat(e))
                        }), (0,
                            r.jsx)(M.Z, {
                            color: "primary",
                            children: i("map.".concat(e))
                        })]
                    }, e))
                })]
            })
        }
            , ec = n(1664)
            , ed = n.n(ec)
            , em = {
            gim: {
                name: "Genshin Impact Map",
                desc: "launched in 2020.",
                url: "https://genshin-impact-map.appsample.com"
            },
            sr: {
                name: "Star Rail Map",
                desc: "launched in 2023.",
                url: "https://star-rail-map.appsample.com"
            }
        }
            , eu = n(2890)
            , ep = n(856)
            , eh = n(6872)
            , ex = (0,
            l.memo)(e => {
                let {mid: t, sids: n} = e
                    , s = (0,
                        d.CG)(c.fh)
                    , i = (0,
                        d.CG)(c.sT)
                    , a = (0,
                        d.TL)()
                    , l = (0,
                        E.Z)()
                    , o = e => {
                        let t = Number(e.target.value);
                        s !== t && (a((0,
                            c.TK)(t)),
                            (0,
                                g.Xc)(t),
                            (0,
                                g.Rk)((0,
                                c.kV)(i), !1))
                    }
                ;
                return (0,
                    r.jsx)(z.Z, {
                    sx: {
                        width: "100%",
                        backgroundColor: "info.light",
                        py: .5,
                        mb: .5,
                        borderRadius: "0.125rem"
                    },
                    children: (0,
                        r.jsxs)(eu.Z, {
                        row: !0,
                        name: "submaps",
                        sx: {
                            justifyContent: "space-around",
                            width: "100%"
                        },
                        children: [(0,
                            r.jsx)(ep.Z, {
                            value: 0,
                            control: (0,
                                r.jsx)(eh.Z, {
                                size: "small",
                                sx: {
                                    p: .25
                                },
                                checked: 0 === s,
                                onChange: o
                            }),
                            label: (0,
                                r.jsx)(M.Z, {
                                color: 0 === s ? "secondary" : "primary",
                                sx: {
                                    fontSize: "0.8rem"
                                },
                                children: "ALL"
                            }),
                            sx: {
                                m: 0
                            }
                        }), null == n ? void 0 : n.map(e => {
                                let n = l("smap.m".concat(t, "s").concat(e));
                                return (0,
                                    r.jsx)(ep.Z, {
                                    value: e,
                                    control: (0,
                                        r.jsx)(eh.Z, {
                                        size: "small",
                                        sx: {
                                            p: .25
                                        },
                                        checked: s === e,
                                        onChange: o
                                    }),
                                    label: (0,
                                        r.jsx)(M.Z, {
                                        color: s === e ? "secondary" : "primary",
                                        sx: {
                                            fontSize: "0.8rem"
                                        },
                                        children: n
                                    }),
                                    title: 'show "'.concat(n, '" markers only'),
                                    sx: {
                                        m: 0
                                    }
                                }, e)
                            }
                        )]
                    })
                })
            }
        )
            , eg = n(5843)
            , ej = (0,
            l.memo)(e => {
                let {mid: t} = e
                    , n = (0,
                    E.Z)()
                    , s = (0,
                    d.CG)(c.sT)
                    , [i,a] = (0,
                    l.useState)(!1);
                return (0,
                    l.useEffect)( () => {
                        a(!1)
                    }
                    , [t]),
                    (0,
                        r.jsx)(h.Z, {
                        display: "flex",
                        alignItems: "center",
                        sx: {
                            backgroundColor: "info.light",
                            pl: 1,
                            py: .875,
                            borderRadius: "0.25rem"
                        },
                        children: (0,
                            r.jsx)(ep.Z, {
                            checked: i,
                            onChange: (e, t) => {
                                a(t),
                                    (0,
                                        g.ZT)(t),
                                    (0,
                                        g.Rk)((0,
                                        c.kV)(s), !1)
                            }
                            ,
                            sx: {
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                m: 0,
                                color: i ? "secondary.main" : "primary.main",
                                flexGrow: 1
                            },
                            control: (0,
                                r.jsx)(eg.Z, {
                                size: "small",
                                color: "secondary"
                            }),
                            label: (0,
                                r.jsx)("small", {
                                style: {
                                    letterSpacing: 0
                                },
                                children: n("ui.hideFound")
                            }),
                            labelPlacement: "start"
                        })
                    })
            }
        )
            , ey = n(629)
            , ev = n(8462)
            , ef = n(8619)
            , ew = n(8885)
            , eb = n(9334)
            , eZ = n(7922)
            , ek = n(9661)
            , eC = n(3508)
            , eT = n(6215)
            , eN = n(9055);
        function eS(e, t, n) {
            return e && 0 !== e.length ? Array.from(new Set(e.map(e => void 0 === e[t] && void 0 !== n ? n : e[t]))) : []
        }
        var eI = n(888)
            , eG = n(2863);
        let e_ = (0,
            l.memo)(e => {
                var t;
                let {mid: n} = e
                    , s = Object.values(m.Gn)
                    , i = eS(s, "wid", 1);
                eS(m.Gn[n].overlays || [], "sid", 1);
                let a = (0,
                    E.Z)()
                    , o = (0,
                    d.TL)()
                    , u = (0,
                    d.CG)(c.sT)
                    , [p,x] = (0,
                    l.useState)((null === (t = m.Gn[n]) || void 0 === t ? void 0 : t.wid) || 1)
                    , j = (0,
                    d.CG)(c.fh)
                    , y = e => {
                    o((0,
                        c.TK)(e)),
                        (0,
                            g.Xv)(),
                        (0,
                            g.Xc)(e),
                        (0,
                            g.Rk)((0,
                            c.kV)(u), !1)
                }
                    , v = function(e, t) {
                    let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                        , s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (e.preventDefault(),
                        x(r),
                    t !== n) {
                        let e = s || m.Gn[t].overlayPreSelect || 0;
                        o((0,
                            c.JJ)([t, e]))
                    } else
                        s && s !== j && y(s)
                };
                return (0,
                    r.jsxs)(h.Z, {
                    children: [(0,
                        r.jsx)(ey.Z, {
                        sx: {
                            mb: 2
                        },
                        variant: "outlined",
                        children: (0,
                            r.jsx)(ev.Z, {
                            component: "nav",
                            disablePadding: !0,
                            children: i.map(e => (0,
                                r.jsxs)(l.Fragment, {
                                children: [(0,
                                    r.jsxs)(ef.Z, {
                                    divider: !0,
                                    sx: {
                                        py: .5,
                                        px: 1
                                    },
                                    onClick: () => x(p !== e && e),
                                    children: [(0,
                                        r.jsx)(ew.Z, {
                                        sx: {
                                            mr: 1
                                        },
                                        children: (0,
                                            r.jsx)(eN.Z, {})
                                    }), (0,
                                        r.jsx)(eb.Z, {
                                        primary: a("world." + e),
                                        primaryTypographyProps: {
                                            fontWeight: "bold"
                                        }
                                    }), p === e ? (0,
                                        r.jsx)(eC.Z, {}) : (0,
                                        r.jsx)(eT.Z, {})]
                                }), (0,
                                    r.jsx)(eZ.Z, {
                                    in: !0 === p || p === e,
                                    timeout: "auto",
                                    sx: {
                                        backgroundColor: "#f3f3f3"
                                    },
                                    children: (0,
                                        r.jsx)(ev.Z, {
                                        component: "div",
                                        disablePadding: !0,
                                        children: s.filter(t => t.wid === e).map(e => {
                                                var t;
                                                return (0,
                                                    r.jsxs)(h.Z, {
                                                    display: "flex",
                                                    sx: {
                                                        pr: .5
                                                    },
                                                    children: [(0,
                                                        r.jsxs)(ef.Z, {
                                                        href: "/?map=".concat(e.key),
                                                        sx: {
                                                            ml: 3,
                                                            py: .25,
                                                            pr: 0,
                                                            flexGrow: 1
                                                        },
                                                        onClick: t => v(t, e.mid, e.wid),
                                                        divider: !0,
                                                        children: [(0,
                                                            r.jsx)(ew.Z, {
                                                            sx: {
                                                                mr: 1
                                                            },
                                                            children: n === e.mid ? (0,
                                                                r.jsx)(eI.Z, {
                                                                color: "secondary"
                                                            }) : (0,
                                                                r.jsx)(eG.Z, {})
                                                        }), (0,
                                                            r.jsx)(eb.Z, {
                                                            primary: a("map." + e.mid),
                                                            primaryTypographyProps: {
                                                                variant: "body2",
                                                                color: n === e.mid ? "secondary" : "primary",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden"
                                                            }
                                                        })]
                                                    }), (e.overlays || []).length >= 2 && (null === (t = e.overlays) || void 0 === t ? void 0 : t.map(t => (0,
                                                        r.jsx)(ef.Z, {
                                                        className: "clickable-icon-button",
                                                        onClick: n => v(n, e.mid, e.wid, t.sid),
                                                        sx: {
                                                            m: 0,
                                                            p: .5,
                                                            flexGrow: 0,
                                                            width: 36
                                                        },
                                                        divider: !0,
                                                        children: (0,
                                                            r.jsx)(ek.Z, {
                                                            variant: "rounded",
                                                            sx: {
                                                                width: 24,
                                                                height: 24,
                                                                fontSize: 12,
                                                                mx: "auto",
                                                                bgcolor: j === t.sid ? "secondary.main" : "grey"
                                                            },
                                                            children: t.name
                                                        })
                                                    }, t.sid)))]
                                                }, e.mid)
                                            }
                                        )
                                    })
                                })]
                            }, e))
                        })
                    }), !1]
                })
            }
        );
        var eM = n(8446);
        let ez = (0,
            l.memo)(e => {
                let {mid: t, variant: n="bar"} = e
                    , s = (0,
                    E.Z)()
                    , i = (0,
                    d.TL)()
                    , a = (0,
                    d.CG)(c.hc);
                if ((0,
                    l.useEffect)( () => {
                        i((0,
                            c.ZN)(["showOverlay", !1]))
                    }
                    , [i, t]),
                    !m.UI.showOverlayToggle)
                    return null;
                let o = () => {
                        let e = !a;
                        i((0,
                            c.ZN)(["showOverlay", e])),
                            (0,
                                g.Of)(e ? -1 : 0)
                    }
                ;
                return "icon" === n ? (0,
                    r.jsx)(L.Z, {
                    onClick: o,
                    title: s("ui.showUnderground"),
                    children: (0,
                        r.jsx)(ew.Z, {
                        children: (0,
                            r.jsx)(eM.Z, {
                            sx: {
                                color: a ? "secondary.main" : "primary.main"
                            }
                        })
                    })
                }) : (0,
                    r.jsx)(h.Z, {
                    display: "flex",
                    alignItems: "center",
                    sx: {
                        backgroundColor: "info.light",
                        pl: 1,
                        py: .75,
                        borderRadius: "0.25rem"
                    },
                    children: (0,
                        r.jsx)(ep.Z, {
                        checked: a,
                        onChange: o,
                        sx: {
                            justifyContent: "space-between",
                            alignItems: "center",
                            display: "flex",
                            m: 0,
                            color: a ? "secondary.main" : "primary.main",
                            flexGrow: 1
                        },
                        control: (0,
                            r.jsx)(eg.Z, {
                            size: "small",
                            color: "secondary"
                        }),
                        label: (0,
                            r.jsx)("small", {
                            children: s("ui.showUnderground")
                        }),
                        labelPlacement: "start"
                    })
                })
            }
        );
        var eL = n(6762)
            , eA = n(1023)
            , eR = e => {
            let {onClick: t} = e;
            return (0,
                r.jsx)(a.Z, {
                className: "hide-on-phone",
                color: "primary",
                size: "small",
                variant: "contained",
                sx: {
                    position: "sticky",
                    bottom: "1rem",
                    right: "1rem",
                    minWidth: "fit-content",
                    float: "right",
                    px: .5,
                    py: .25
                },
                "aria-label": "scorll to top",
                title: "Scroll to top",
                onClick: t,
                children: (0,
                    r.jsx)(C.Z, {})
            })
        }
            , eE = e => {
            var t, n, s;
            let {scrollToTop: i} = e
                , o = (0,
                d.TL)()
                , u = (0,
                d.CG)(c.S1)
                , p = (0,
                d.CG)(c.g$)
                , x = (0,
                d.CG)(eL.EA)
                , g = (0,
                E.Z)()
                , j = m.Gn[p]
                , y = j.category
                , v = new Set(Object.values(m.Gn).map(e => e.wid || 1)).size > 1;
            return (0,
                r.jsxs)("div", {
                children: [j.topBanner && (0,
                    r.jsx)("img", {
                    src: null === (t = j.topBanner) || void 0 === t ? void 0 : t.image,
                    style: {
                        width: "100%",
                        minHeight: "2rem",
                        borderRadius: "0.25rem",
                        marginBottom: "0.25rem"
                    },
                    alt: "click to switch map",
                    className: "clickable",
                    onClick: () => {
                        var e, t;
                        (null === (e = j.topBanner) || void 0 === e ? void 0 : e.targetMid) && o((0,
                            c.JJ)([null === (t = j.topBanner) || void 0 === t ? void 0 : t.targetMid]))
                    }
                }), j.topHtml && (0,
                    r.jsx)("div", {
                    dangerouslySetInnerHTML: {
                        __html: j.topHtml
                    }
                }), (null === (n = j.topHtml) || void 0 === n ? void 0 : n.includes("main map")) && (0,
                    r.jsx)("div", {
                    className: "mb-4 text-center",
                    children: (0,
                        r.jsx)(a.Z, {
                        variant: "outlined",
                        startIcon: (0,
                            r.jsx)(eA.Z, {}),
                        onClick: () => {
                            o((0,
                                c.JJ)([m.dy]))
                        }
                        ,
                        children: "Back to main map"
                    })
                }), v && (0,
                    r.jsx)(e_, {
                    mid: p
                }), (0,
                    r.jsxs)(h.Z, {
                    sx: {
                        display: "grid",
                        py: 1,
                        gap: .5,
                        gridTemplateColumns: "repeat(2, 1fr)"
                    },
                    children: [!v && !(0,
                        m.N0)("pw") && (0,
                        r.jsx)(eo, {}), !(0,
                        m.N0)("sr") && (0,
                        r.jsx)(er, {}), (0,
                        m.N0)("gim") && !!(null === (s = m.Gn[p].overlays) || void 0 === s ? void 0 : s.length) && (0,
                        r.jsx)(ez, {
                        mid: p
                    }), x && (0,
                        r.jsx)(ej, {
                        mid: p
                    })]
                }), (0,
                    r.jsx)(ei, {}), m.Gn[p].sids && (0,
                    r.jsx)(ex, {
                    mid: p,
                    sids: m.Gn[p].sids
                }), Object.entries(y).map(e => {
                        let[t,n] = e;
                        return 0 === n.length ? null : 0 === t.indexOf("message") ? (0,
                            r.jsx)(M.Z, {
                            variant: "body2",
                            sx: {
                                my: 3,
                                lineHeight: 1.125
                            },
                            textAlign: "center",
                            children: n[0]
                        }, t) : 0 === t.indexOf("char") ? (0,
                            r.jsx)(m.WJ.MarkerGroupChar, {
                            defaultCharId: n[0],
                            withCount: u
                        }, t) : (0,
                            r.jsx)(Q, {
                            title: t,
                            types: n,
                            withText: m.sp.withTextCategory.includes(t),
                            withCount: u
                        }, t)
                    }
                ), j.bottomComps && j.bottomComps.map( (e, t) => (0,
                    l.createElement)(e[0], {
                    key: t,
                    ...e[1]
                })), (0,
                    r.jsx)("hr", {
                    className: "my-4"
                }), (0,
                    r.jsx)(M.Z, {
                    component: "div",
                    variant: "body2",
                    children: (0,
                        r.jsx)("ul", {
                        className: "list d-flex",
                        children: Object.entries(m.Fe).map(e => {
                                let[t,n] = e
                                    , s = Number(t)
                                    , i = s === m.dy;
                                return m.Gn[s] ? (0,
                                    r.jsx)("li", {
                                    onClick: () => o((0,
                                        c.JJ)([s])),
                                    children: (0,
                                        r.jsx)(ed(), {
                                        href: i ? m.GW : "".concat(m.GW, "?map=").concat(m.Gn[s].key),
                                        children: g("map." + t)
                                    })
                                }, t) : null
                            }
                        )
                    })
                }), (0,
                    r.jsx)("hr", {
                    className: "my-4"
                }), j.bottomHtml && (0,
                    r.jsx)(M.Z, {
                    component: "div",
                    variant: "body2",
                    children: (0,
                        r.jsx)("div", {
                        dangerouslySetInnerHTML: {
                            __html: j.bottomHtml
                        }
                    })
                }), (0,
                    r.jsx)("hr", {
                    className: "my-4"
                }), (0,
                    r.jsxs)(M.Z, {
                    component: "div",
                    variant: "caption",
                    children: ["Other game maps:", " ", Object.entries(em).map(e => {
                            let[t,n] = e;
                            return t === m.lw ? null : (0,
                                r.jsxs)("span", {
                                children: [(0,
                                    r.jsx)("a", {
                                    target: "_blank",
                                    rel: "noreferrer",
                                    href: n.url,
                                    children: n.name
                                }), ": ", n.desc, " "]
                            }, t)
                        }
                    ), "More tools:", " ", (0,
                        r.jsx)("a", {
                        target: "_blank",
                        rel: "noreferrer",
                        href: "https://genshin.hotgames.gg/wish-counter",
                        children: "Genshin Wish Counter"
                    }), !(0,
                        m.N0)("ww") && (0,
                        r.jsxs)(r.Fragment, {
                        children: ["Other languages: ", (0,
                            r.jsx)("a", {
                            href: "/ru-ru",
                            children: "Ρусский"
                        }), " ", (0,
                            r.jsx)("a", {
                            href: "/ja-jp",
                            children: "日本語"
                        })]
                    })]
                }), (0,
                    r.jsx)(eR, {
                    onClick: i
                })]
            })
        }
            , eD = n(6242)
            , eO = n(8445)
            , eF = n(3540)
            , eU = n(2641)
            , eW = n(7720);
        let eH = {
            maxWidth: "50%"
        };
        var eJ = (0,
            l.memo)(e => {
                let {className: t=""} = e
                    , [n,s] = (0,
                    l.useState)(null)
                    , i = (0,
                    E.Z)()
                    , o = null !== n && "modal" === m._H[n].type ? m._H[n].component : null;
                return (0,
                    r.jsxs)("div", {
                    className: "TopNav ".concat(t),
                    children: [(0,
                        r.jsx)("div", {
                        className: "TopNav_Menu",
                        children: m._H.map( (e, t) => {
                                let l = e.text.includes("lang:") ? i(e.text.replace("lang:", "")) : e.text;
                                return "link" === e.type ? (0,
                                    r.jsx)(a.Z, {
                                    color: "info",
                                    variant: "contained",
                                    size: "small",
                                    startIcon: (0,
                                        r.jsx)("img", {
                                        src: e.icon,
                                        alt: e.text,
                                        loading: "lazy",
                                        style: {
                                            borderRadius: "50%"
                                        }
                                    }),
                                    href: e.link,
                                    target: e.target,
                                    className: e.mobile ? "" : "hide-on-phone",
                                    style: eH,
                                    children: l
                                }, e.text) : "modal" === e.type ? (0,
                                    r.jsx)(a.Z, {
                                    color: n === t ? "primary" : "info",
                                    variant: "contained",
                                    size: "small",
                                    startIcon: (0,
                                        r.jsx)("img", {
                                        src: e.icon,
                                        alt: e.text
                                    }),
                                    onClick: () => s(null === n ? t : null),
                                    className: e.mobile ? "" : "hide-on-phone",
                                    style: eH,
                                    children: l
                                }, e.text) : void 0
                            }
                        )
                    }), (0,
                        r.jsx)("div", {
                        children: o && (0,
                            r.jsx)(o, {})
                    })]
                })
            }
        )
            , eB = n(1458)
            , eV = n(9993)
            , eq = (0,
            l.memo)(e => {
                let { icon: t, value: n, total: s, name: i } = e;
                console.log("=== eq component rendering ===");
                console.log("Props (e):", e);
                console.log("icon (t):", t);
                console.log("value (n):", n);
                console.log("total (s):", s);
                console.log("name (i):", i);
                console.log("eB (LinearProgress?):", eB);
                console.log("eV (utils?):", eV);
                console.log("eV.ok(i, s):", eV.ok(i, s));
                console.log("eq (this component):", eq);
                console.log("eq (r):", r);
                console.log("eq (r.jsxs):", r.jsxs);

                let a = (0, E.Z)();
                let c = a("markers." + i);
                console.log("localized name (c):", c);
    
                let l = s > 0 ? Math.min(100, (n / s) * 100) : 0;
                let o = m.sp.biggerCount ? (0, eV.ok)(i, s) : s;
    
                // Override image src if type is o8
                let imageSrc = i === "o8"
                    ? "https://raw.githubusercontent.com/Blackout03/image-hosting/refs/heads/main/Mondstadt.png"
                    : t;
                // Override title if type is o8
                let titleName = i === "o8"
                    ? "Mondstadt Shrine of Depths"
                    : c;

                return (0, r.jsxs)("div", {
                    className: "d-flex mb-2",
                    title: titleName,
                    children: [(0,
                        r.jsx)("img", {
                        className: "mr-2",
                        src: imageSrc,
                        style: {
                            height: "2.25em",
                            width: "2.25em"
                        },
                        alt: a("markers.".concat(i))
                    }), (0,
                        r.jsxs)("div", {
                        className: "flex-grow-1",
                        children: [(0,
                            r.jsxs)("div", {
                            className: "d-flex mb-2 justify-content-between",
                            style: {
                                fontSize: "0.9em"
                            },
                            children: [(0,
                                r.jsx)("span", {
                                style: {
                                    whiteSpace: "nowrap",
                                    maxWidth: "8.5em",
                                    textOverflow: "ellipsis"
                                },
                                children: titleName
                            }), (0,
                                r.jsxs)("span", {
                                style: {
                                    textAlign: "right"
                                },
                                children: [n, " / ", o, " Found"]
                            })]
                        }), (0,
                            r.jsx)(eB.Z, {
                            sx: {
                                height: "0.4rem"
                            },
                            variant: "determinate",
                            color: "primary",
                            value: l
                        })]
                    })]
                })
            }
        )
            , eK = n(1903)
            , eQ = () => {
            let[e,t] = (0,
                    l.useState)(null)
                , [n,s] = (0,
                    l.useState)(!1)
                , [i,o] = (0,
                    l.useState)("")
                , [c,d] = (0,
                    l.useState)("")
                , [m,u] = (0,
                    l.useState)("")
                , [p,g] = (0,
                    l.useState)(null)
                , [y,v] = (0,
                    l.useState)(!1)
                , f = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(i)
                , w = async t => {
                    if (t.preventDefault(),
                        g(null),
                        !f) {
                        g("Invalid email address");
                        return
                    }
                    if (c.length < 6) {
                        g("Password must be at least 6 characters");
                        return
                    }
                    if ("Register" === e && c !== m) {
                        g("Two passwords do not match");
                        return
                    }
                    s(!0);
                    let n = "Register" === e ? "user.register" : "user.log_in";
                    try {
                        await eU.Z.emailSignIn(i, c, "Register" === e),
                            S.cO.set("authProvider", "email"),
                            j.Z.increment10(n, {
                                result: "success",
                                type: "email"
                            })
                    } catch (t) {
                        let e = t.message;
                        e.includes("email-already-in-use") ? g("Email already in use. Log in instead?") : e.includes("user-not-found") || e.includes("wrong-password") ? g("Wrong password or user not found") : g(t.message),
                            j.Z.increment10(n, {
                                result: "error",
                                type: "email"
                            })
                    } finally {
                        s(!1)
                    }
                }
                , b = async () => {
                    if (!f) {
                        g("Invalid email address");
                        return
                    }
                    if (!1 !== confirm("Send password recovery email to ".concat(i, "?")))
                        try {
                            await eU.Z.sendPasswordResetEmail(i),
                                g("Success! If ".concat(i, " is in our system, you'll receive a password recovery email shortly. Click\n            the link in email to reset your password.")),
                                v(!0),
                                d(""),
                                t("Log in"),
                                j.Z.increment10("user.forgot_password", {
                                    result: "success",
                                    type: "email"
                                })
                        } catch (e) {
                            g(e.message),
                                j.Z.increment10("user.forgot_password", {
                                    result: "error",
                                    type: "email"
                                })
                        }
                }
            ;
            return (0,
                l.useEffect)( () => {
                    "email" === S.cO.get("authProvider") && t("Log in")
                }
                , []),
                (0,
                    r.jsx)(h.Z, {
                    sx: {
                        backgroundColor: "#eee",
                        p: 2,
                        mb: 4
                    },
                    children: e ? (0,
                        r.jsxs)("form", {
                        action: "#",
                        onSubmit: w,
                        children: [(0,
                            r.jsxs)(eu.Z, {
                            row: !0,
                            name: "row-radio-buttons-group",
                            sx: {
                                mb: 1,
                                justifyContent: "center"
                            },
                            onChange: e => t(e.currentTarget.value),
                            children: [(0,
                                r.jsx)(ep.Z, {
                                value: "Log in",
                                control: (0,
                                    r.jsx)(eh.Z, {
                                    size: "small",
                                    checked: "Log in" === e
                                }),
                                label: "Log in"
                            }), (0,
                                r.jsx)(ep.Z, {
                                value: "Register",
                                control: (0,
                                    r.jsx)(eh.Z, {
                                    size: "small",
                                    checked: "Register" === e
                                }),
                                label: "Register"
                            })]
                        }), (0,
                            r.jsx)(eK.Z, {
                            label: "Email",
                            type: "email",
                            name: "email",
                            size: "small",
                            fullWidth: !0,
                            sx: {
                                mb: 1,
                                input: {
                                    background: "#f9f9f9"
                                }
                            },
                            onChange: e => {
                                o(e.currentTarget.value),
                                    g(null)
                            }
                        }), (0,
                            r.jsx)(eK.Z, {
                            label: "Password",
                            name: "password",
                            type: "password",
                            size: "small",
                            fullWidth: !0,
                            sx: {
                                mb: 1,
                                input: {
                                    background: "#f9f9f9"
                                }
                            },
                            value: c,
                            onChange: e => {
                                d(e.currentTarget.value),
                                    g(null)
                            }
                        }), "Register" === e && (0,
                            r.jsx)(eK.Z, {
                            label: "Confirm password",
                            name: "password2",
                            type: "password",
                            size: "small",
                            fullWidth: !0,
                            sx: {
                                mb: 1,
                                input: {
                                    background: "#f9f9f9"
                                }
                            },
                            value: m,
                            onChange: e => {
                                u(e.currentTarget.value),
                                    g(null)
                            }
                        }), p && (0,
                            r.jsx)(es.Z, {
                            severity: (null == p ? void 0 : p.includes("Success")) ? "info" : "error",
                            variant: "filled",
                            sx: {
                                mb: 1,
                                py: .25
                            },
                            children: p
                        }), (0,
                            r.jsxs)(h.Z, {
                            display: "flex",
                            justifyContent: "space-between",
                            children: [(0,
                                r.jsx)(a.Z, {
                                type: "submit",
                                variant: "contained",
                                disableElevation: !0,
                                color: "success",
                                disabled: n,
                                sx: {
                                    width: "50%"
                                },
                                children: n ? (0,
                                    r.jsx)(x.Z, {
                                    size: "1em",
                                    sx: {
                                        m: .5
                                    }
                                }) : e
                            }), (0,
                                r.jsx)(a.Z, {
                                variant: "text",
                                type: "button",
                                size: "small",
                                onClick: b,
                                disabled: y,
                                children: y ? "(Email Sent)" : "Forgot Password?"
                            })]
                        })]
                    }) : (0,
                        r.jsxs)(M.Z, {
                        variant: "body2",
                        color: "grey",
                        children: ["Having trouble signing in with Google? No problem. You can also", " ", (0,
                            r.jsx)("a", {
                            href: "#",
                            onClick: () => t("Register"),
                            children: "register or log in with your email"
                        }), "."]
                    })
                })
        }
            , e$ = n(4152)
            , eY = n(4267)
            , eX = (0,
            l.memo)(e => {
                let {label: t, kdvbKey: n, desc: s, defaultValue: i} = e
                    , [a,o] = (0,
                    l.useState)(!1);
                return (0,
                    l.useEffect)( () => {
                        let e = S.cO.get(n);
                        null === e && (e = i),
                            o(1 === e)
                    }
                    , [i, n]),
                    (0,
                        r.jsxs)(h.Z, {
                        sx: {
                            backgroundColor: "info.light",
                            pl: 1,
                            py: .875,
                            mb: 2,
                            borderRadius: "0.25rem"
                        },
                        children: [(0,
                            r.jsx)(ep.Z, {
                            checked: a,
                            onChange: (e, t) => {
                                S.cO.set(n, !0 === t ? 1 : 0),
                                    o(t)
                            }
                            ,
                            sx: {
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                m: 0,
                                color: a ? "secondary.main" : "primary.main"
                            },
                            control: (0,
                                r.jsx)(eg.Z, {
                                size: "small",
                                color: "secondary"
                            }),
                            label: t,
                            labelPlacement: "start"
                        }), s && (0,
                            r.jsx)(M.Z, {
                            variant: "caption",
                            sx: {
                                color: "text.secondary"
                            },
                            children: s
                        })]
                    })
            }
        );
        let e0 = e => {
                if (!e)
                    return;
                let t = S.cO.get("gim-local-markers");
                if (t && Array.isArray(t.markerIds)) {
                    if (!confirm("This will upload " + t.markerIds.length + " records and override(replace) the data on cloud. Are you sure?"))
                        return;
                    eU.Z.set("users-backup", e, t).then( () => {
                            alert("".concat(t.markerIds.length, " markers has been uploaded and backed up."))
                        }
                    ).catch( () => {}
                    )
                } else
                    alert("Sorry, but you do not have any local data to backup")
            }
            , e1 = e => {
                e && confirm("This will download backup from cloud, and merge into your local data. Are you sure?") && eU.Z.get("users-backup", e).then(e => {
                        if (e && Array.isArray(e.markerIds)) {
                            let t = S.cO.get("gim-local-markers");
                            t && Array.isArray(t.markerIds) && t.markerIds.forEach(t => {
                                    e.markerIds.includes(t) || e.markerIds.push(t)
                                }
                            ),
                                S.cO.set("gim-local-markers", e),
                                alert("Restore successfully! Map is going to reload."),
                                window.location.href = m.GW
                        }
                    }
                )
            }
        ;
        var e2 = e => {
                var t, n, s, i, o, c, u, p;
                let {isActive: x} = e
                    , g = (0,
                    d.CG)(eL.EA)
                    , j = (0,
                    d.CG)(eL.Q_)
                    , [y,f] = (0,
                    l.useState)(!1)
                    , w = Object.values(j).reduce( (e, t) => e + t.found, 0)
                    , b = () => eU.Z.signIn().then(e => {
                        console.log("sign in successfully: ", e.name)
                    }
                ).catch(e => {
                        let t = e.message;
                        t.includes("popup-closed-by-user") || alert("Sorry, failed to sign in: ".concat(t))
                    }
                );
                return (0,
                    r.jsxs)(h.Z, {
                    sx: {
                        py: 1
                    },
                    children: [(null == g ? void 0 : g.uid) ? (0,
                        r.jsxs)("div", {
                        children: [(0,
                            r.jsxs)(eD.Z, {
                            variant: "elevation",
                            elevation: 0,
                            sx: {
                                backgroundColor: "#e6e6e6",
                                mb: 2
                            },
                            children: [(0,
                                r.jsx)(eO.Z, {
                                avatar: (0,
                                    r.jsx)(ek.Z, {
                                    src: g.photo
                                }),
                                action: (0,
                                    r.jsx)($.Z, {
                                    onClick: () => {
                                        confirm("\uD83C\uDFC3‍♂️\uD83D\uDCA8 Sign out your account?") && eU.Z.signOut().then( () => {
                                                (0,
                                                    v.jU)() && window.location.reload()
                                            }
                                        )
                                    }
                                    ,
                                    title: "Sign out",
                                    color: "error",
                                    children: (0,
                                        r.jsx)(eF.Z, {})
                                }),
                                title: (0,
                                    r.jsx)(M.Z, {
                                    variant: "h6",
                                    sx: {
                                        mb: -.5
                                    },
                                    children: g.name
                                }),
                                subheader: g.email,
                                sx: {
                                    pb: 0
                                }
                            }), (0,
                                r.jsxs)(eY.Z, {
                                children: [(0,
                                    r.jsxs)(eW.Z, {
                                    sx: {
                                        mb: 1
                                    },
                                    children: [w, " Places Found", (0,
                                        r.jsx)("br", {}), (0,
                                        r.jsx)("small", {
                                        children: "(Always Free)"
                                    })]
                                }), Object.entries(j).map(e => {
                                        let[t,n] = e;
                                        return (0,
                                            r.jsx)(eq, {
                                            name: t,
                                            value: n.found,
                                            total: n.total,
                                            icon: "".concat("https://game-cdn.appsample.com/gim", "/").concat("markers/{type}.png?v=1").replace("{type}", t)
                                        }, t)
                                    }
                                )]
                            })]
                        }), (0,
                            m.N0)("gim") && (0,
                            r.jsxs)("div", {
                            children: [(0,
                                r.jsx)("p", {
                                children: "For lagacy users only: If you have ever saved markers locally in browser, use these tools to backup them to cloud or download them to your browser:"
                            }), (0,
                                r.jsx)(a.Z, {
                                size: "small",
                                color: "success",
                                variant: "outlined",
                                onClick: () => e0(null == g ? void 0 : g.uid),
                                children: "Upload to cloud"
                            }), " ", (0,
                                r.jsx)(a.Z, {
                                size: "small",
                                color: "success",
                                variant: "outlined",
                                onClick: () => e1(null == g ? void 0 : g.uid),
                                children: "Download to browser"
                            })]
                        }), (0,
                            m.N0)("sr2") && g.email && x && (0,
                            r.jsx)(e$.ZP, {
                            email: g.email,
                            uid: g.uid
                        })]
                    }) : (0,
                        r.jsxs)("div", {
                        children: [(0,
                            r.jsx)("h3", {
                            className: "mt-0",
                            children: "Sign in to enable more features:"
                        }), (0,
                            r.jsxs)("ul", {
                            className: "list",
                            children: [(0,
                                r.jsx)("li", {
                                children: 'Save "Mark as found" to the cloud and sync across multiple devices.'
                            }), (0,
                                r.jsx)("li", {
                                children: "Post a comment on markers and upvote/downvote comments."
                            })]
                        }), (0,
                            r.jsx)("div", {
                            className: "text-center mb-3",
                            children: (0,
                                r.jsx)("a", {
                                href: "#",
                                title: "Sign in with Google",
                                onClick: () => {
                                    b(),
                                        f(!0)
                                }
                                ,
                                children: (0,
                                    r.jsx)("img", {
                                    src: "https://game-cdn.appsample.com/gim/images/google-btn.png",
                                    alt: "Sign in with Google",
                                    style: {
                                        width: "12rem",
                                        maxWidth: "100%"
                                    },
                                    className: "clickable"
                                })
                            })
                        }), (0,
                            m.N0)("sr") && (0,
                            r.jsx)(eQ, {})]
                    }), (0,
                        r.jsx)(eW.Z, {
                        sx: {
                            mt: 5,
                            mb: 3
                        },
                        children: "Settings"
                    }), (null === (n = m.UI.settingToggle) || void 0 === n ? void 0 : null === (t = n.hideMarkersOnDrag) || void 0 === t ? void 0 : t.enable) && (0,
                        r.jsx)(eX, {
                        label: "Hide markers while dragging map",
                        kdvbKey: "setting-hide-on-drag",
                        desc: "Enable for a clearer view when there are too many markers",
                        defaultValue: null === (i = m.UI.settingToggle) || void 0 === i ? void 0 : null === (s = i.hideMarkersOnDrag) || void 0 === s ? void 0 : s.default
                    }), (null === (c = m.UI.settingToggle) || void 0 === c ? void 0 : null === (o = c.aiSummary) || void 0 === o ? void 0 : o.enable) && (0,
                        r.jsx)(eX, {
                        label: "Show AI-generated summary in tooltip",
                        kdvbKey: "setting-ai-summary",
                        desc: "Beta feature - use AI to summarize top 10 comments",
                        defaultValue: null === (p = m.UI.settingToggle) || void 0 === p ? void 0 : null === (u = p.aiSummary) || void 0 === u ? void 0 : u.default
                    }), (0,
                        r.jsx)(eW.Z, {
                        className: "hide-none-phone mb-3",
                        sx: {
                            mt: 5,
                            mb: 3
                        },
                        children: "Tools"
                    }), (0,
                        r.jsx)(eJ, {
                        className: "hide-none-phone mb-3"
                    }), m.UI.tabProfile.tips && (0,
                        r.jsxs)(r.Fragment, {
                        children: [(0,
                            r.jsx)(eW.Z, {
                            sx: {
                                mt: 5,
                                mb: 3
                            },
                            children: "Tips:"
                        }), (0,
                            r.jsx)("div", {
                            dangerouslySetInnerHTML: {
                                __html: m.UI.tabProfile.tips
                            }
                        })]
                    }), (0,
                        r.jsx)(eW.Z, {
                        sx: {
                            mt: 5,
                            mb: 3
                        },
                        children: "Links"
                    }), (0,
                        m.N0)("gim,sr") && (0,
                        r.jsx)("p", {
                        className: "blue",
                        children: (0,
                            r.jsx)(ed(), {
                            href: "/help/embed",
                            children: "Embed Map in your website"
                        })
                    }), (0,
                        r.jsx)("p", {
                        className: "blue",
                        children: (0,
                            r.jsx)(ed(), {
                            href: "/privacy-policy",
                            children: "Privacy Policy"
                        })
                    }), (0,
                        r.jsx)("p", {
                        className: "blue",
                        "data-ccpa-link": "1"
                    })]
                })
            }
        ;
        async function e5(e) {
            try {
                let {data: t} = await S.od.putForm("https://uploader.appsample.workers.dev", e);
                return {
                    path: t.path,
                    url: t.url
                }
            } catch (e) {
                var t, n;
                throw u.Z.error(e),
                    Error((null === (n = e.response) || void 0 === n ? void 0 : null === (t = n.data) || void 0 === t ? void 0 : t.error) || "unknown upload error")
            }
        }
        var e3 = n(1359)
            , e8 = n(8288)
            , e9 = n(4905)
            , e4 = n(4602)
            , e6 = n(8364)
            , e7 = n(6770)
            , te = n.n(e7)
            , tt = n(759)
            , tn = n(5487)
            , tr = n(4156)
            , ts = n(292)
            , ti = e => {
                let {src: t="", defer: n} = e
                    , [s,i] = (0,
                    l.useState)(!n)
                    , [a,o] = (0,
                    l.useState)(t)
                    , c = (0,
                    d.TL)();
                return ((0,
                    l.useEffect)( () => {
                        if (n) {
                            i(!1),
                                o("");
                            let e = setTimeout( () => {
                                    i(!0),
                                        o(t)
                                }
                                , 50);
                            return () => clearTimeout(e)
                        }
                    }
                    , [t, n]),
                    t) ? (0,
                    r.jsx)("img", {
                    src: n ? a : t,
                    className: "w-100 rounded ".concat(n ? s ? "fade-in" : "invisible-50" : ""),
                    style: {
                        minHeight: "10rem",
                        cursor: "pointer",
                        backgroundColor: "rgba(0, 0, 0, 0.06)"
                    },
                    onClick: () => {
                        (0,
                            y.tq)() || c((0,
                            f.bC)(t))
                    }
                    ,
                    alt: "screenshot"
                }) : null
            }
        ;
        function ta(e) {
            return 100 * Math.floor(e / 100)
        }
        var tl = (0,
            l.memo)(e => {
                var t, n, s, i, a;
                let {data: o, type: c, id: u, rank: p, lang: h} = e
                    , x = (0,
                        d.CG)(eL.EA)
                    , g = (0,
                        d.TL)()
                    , [v,w] = (0,
                        l.useState)(0)
                    , [b,Z] = (0,
                        l.useState)((null === (t = o.media) || void 0 === t ? void 0 : t.type) === "image" && p <= 1 && o.vote > 20)
                    , [k,C] = (0,
                        l.useState)(!0)
                    , T = null === (n = o.trans) || void 0 === n ? void 0 : n[h]
                    , N = e => {
                        if ((null == x ? void 0 : x.shortId) === o.auid) {
                            g((0,
                                f.PJ)({
                                style: "error",
                                t: ["msg.cantVoteYourself"]
                            }));
                            return
                        }
                        w("upVote" === e ? 1 : -1),
                            g((0,
                                f.PJ)({
                                t: ["msg.thanksForFeedback"]
                            }));
                        let t = Date.now();
                        S.Gt.voteComment({
                            app: m.lw,
                            categoryId: c,
                            docId: u,
                            auid: o.auid,
                            vote: e,
                            uid: (null == x ? void 0 : x.shortId) || "_ip"
                        }).then(n => {
                                var r, s;
                                j.Z.increment("comment.".concat(e.toLowerCase()), {
                                    type: c,
                                    hostname: (null == n ? void 0 : null === (s = n.data) || void 0 === s ? void 0 : null === (r = s.meta) || void 0 === r ? void 0 : r.hostname) || "unknown",
                                    time: ta(Date.now() - t)
                                })
                            }
                        ).catch(e => {}
                        )
                    }
                ;
                return (0,
                    r.jsxs)("div", {
                    className: "Comment",
                    children: [b && (0,
                        r.jsx)(ti, {
                        src: null === (s = o.media) || void 0 === s ? void 0 : s.embed
                    }), (0,
                        r.jsxs)("div", {
                        className: "d-flex",
                        children: [(0,
                            r.jsxs)("div", {
                            className: "Comment_CommentText",
                            children: [(0,
                                r.jsx)(M.Z, {
                                variant: "body2",
                                sx: {
                                    lineHeight: 1.25,
                                    wordBreak: "break-word"
                                },
                                children: k && T ? T : o.content
                            }), (0,
                                r.jsxs)("div", {
                                children: [(0,
                                    r.jsxs)($.Z, {
                                    size: "small",
                                    sx: {
                                        ml: -.5,
                                        mr: .125,
                                        borderRadius: "0.5em"
                                    },
                                    onClick: () => N("upVote"),
                                    children: [(0,
                                        r.jsxs)("div", {
                                        className: 1 === v ? "fireworks active" : "fireworks",
                                        children: [(0,
                                            r.jsxs)("div", {
                                            className: "effect-group",
                                            children: [(0,
                                                r.jsx)("span", {
                                                className: "effect"
                                            }), (0,
                                                r.jsx)("span", {
                                                className: "effect"
                                            }), (0,
                                                r.jsx)("span", {
                                                className: "effect"
                                            }), (0,
                                                r.jsx)("span", {
                                                className: "effect"
                                            }), (0,
                                                r.jsx)("span", {
                                                className: "effect"
                                            })]
                                        }), (0,
                                            r.jsx)(tt.Z, {
                                            color: 1 === v ? "success" : "action",
                                            fontSize: "inherit",
                                            sx: {
                                                mt: .25
                                            }
                                        })]
                                    }), (0,
                                        r.jsx)(M.Z, {
                                        component: "span",
                                        sx: {
                                            ml: .5
                                        },
                                        color: 1 === v ? "success.main" : "text.secondary",
                                        children: o.vote > 1e3 ? "".concat((o.vote / 1e3).toFixed(1), "k") : v + o.vote
                                    })]
                                }), (0,
                                    r.jsx)($.Z, {
                                    size: "small",
                                    sx: {
                                        mr: 1,
                                        borderRadius: "0.5em"
                                    },
                                    onClick: () => N("downVote"),
                                    children: (0,
                                        r.jsx)(tn.Z, {
                                        color: -1 === v ? "error" : "action",
                                        fontSize: "inherit"
                                    })
                                }), T && T != o.content && (0,
                                    r.jsx)($.Z, {
                                    size: "small",
                                    sx: {
                                        mr: 1
                                    },
                                    onClick: () => C(!k),
                                    title: "This has been translated. Show original content?",
                                    children: (0,
                                        r.jsx)(ts.Z, {
                                        color: k ? "secondary" : "action",
                                        fontSize: "inherit"
                                    })
                                }), (0,
                                    r.jsxs)("small", {
                                    style: {
                                        color: "#999"
                                    },
                                    children: ["- ", o.aname, " ", o.time]
                                })]
                            })]
                        }), o.media && !b ? (0,
                            r.jsx)(tr.Z, {
                            placement: "right-end",
                            disableFocusListener: !0,
                            disableTouchListener: !0,
                            title: (null === (i = o.media) || void 0 === i ? void 0 : i.type) === "image" ? (0,
                                r.jsx)("img", {
                                src: null === (a = o.media) || void 0 === a ? void 0 : a.embed,
                                className: "Tooltip__image w-100 rounded",
                                alt: "screenshot"
                            }) : "Click to view video",
                            children: (0,
                                r.jsx)("img", {
                                onClick: () => {
                                    var e, t;
                                    (null === (e = o.media) || void 0 === e ? void 0 : e.type) === "image" && (0,
                                        y.tq)() ? Z(!0) : g((0,
                                        f.bC)((null === (t = o.media) || void 0 === t ? void 0 : t.embed) || ""))
                                }
                                ,
                                className: "card-image rounded clickable",
                                src: o.media.thumbnail,
                                alt: "media",
                                loading: "lazy"
                            })
                        }) : null]
                    })]
                })
            }
        );
        let to = (0,
                r.jsxs)(M.Z, {
                variant: "body2",
                align: "center",
                sx: {
                    my: 5
                },
                children: ["Help us grow our community by sharing this tool on social media and Discord servers. The more users join in, the more helpful our discussions will become.", (0,
                    r.jsx)("br", {}), "Thank you for your support ♥", (0,
                    r.jsx)("br", {}), "\uD83D\uDC47", (0,
                    r.jsx)("br", {}), (0,
                    r.jsx)("b", {
                    children: "https://genshin-impact-map.appsample.com"
                })]
            })
            , tc = (e, t) => {
                if (t && (0,
                    v.jU)()) {
                    var n, r;
                    if (1 === S.cO.get("setting-ai-summary", null === (r = m.UI.settingToggle) || void 0 === r ? void 0 : null === (n = r.aiSummary) || void 0 === n ? void 0 : n.default)) {
                        let n = document.getElementById("info-window-".concat(e));
                        if (n) {
                            let e = '<div class="my-3 tooltip-summary">';
                            e += '<img src="https://game-cdn.appsample.com/share/icons/gpt-666.png" style="height:1em" title="AI-generated summary" /> ' + t.replace(/^"|"$/g, "") + "</div>",
                                n.innerHTML = e
                        }
                    }
                }
            }
        ;
        var td = e => {
                var t;
                let {scrollToTop: n} = e;
                u.Z.render("CommentTab");
                let s = (0,
                    d.CG)(c.hS)
                    , i = (0,
                    d.CG)(eL.EA)
                    , o = (0,
                    d.CG)(f.KQ)
                    , [p,g] = (0,
                    l.useState)(null)
                    , [v,w] = (0,
                    l.useState)(!1)
                    , [b,Z] = (0,
                    l.useState)("")
                    , [k,C] = (0,
                    l.useState)(null)
                    , [T,N] = (0,
                    l.useState)("")
                    , I = (0,
                    E.Z)()
                    , G = (0,
                    d.TL)()
                    , _ = (0,
                    y.tq)();
                (0,
                    l.useEffect)( () => {
                        if (null == s ? void 0 : s.id) {
                            if (g(null),
                                C(null),
                            s.level < 3)
                                return;
                            n();
                            let e = Date.now();
                            S.Gt.loadComments({
                                useProxy: !0,
                                app: m.lw,
                                categoryId: s.type,
                                docId: String(s.id),
                                lang: o,
                                pageSize: 100,
                                ttl: Number(s.id) >= m.sp.shortTtlMarkerId ? m.sp.commentTtl || 1800 : 7e3
                            }).then(t => {
                                    w(!1),
                                    Array.isArray(t.comments) && g(t.comments),
                                        tc(s.id, t.summary),
                                        j.Z.increment100("comment.load", {
                                            type: s.type,
                                            time: ta(Date.now() - e),
                                            count: t.comments.length,
                                            proxy: !0
                                        })
                                }
                            ).catch(e => {
                                    console.error("fail to get comments", e.message)
                                }
                            )
                        }
                    }
                    , [s]);
                let L = "".concat("https://genshin-impact-map.appsample.com", "/?type=").concat(null == s ? void 0 : s.type, "&id=").concat(null == s ? void 0 : s.id, "&mid=").concat(null == s ? void 0 : s.mid)
                    , A = async () => {
                        try {
                            if ("clipboard"in navigator)
                                await navigator.clipboard.writeText(L);
                            else {
                                var e;
                                null === (e = document) || void 0 === e || e.execCommand("copy", !0, L)
                            }
                            G((0,
                                f.PJ)({
                                body: "URL copied!"
                            }))
                        } catch (e) {
                            G((0,
                                f.PJ)({
                                body: "Fail to copy URL",
                                style: "error"
                            }))
                        }
                        j.Z.increment("comment.share", {
                            type: (null == s ? void 0 : s.type) || "unknow"
                        })
                    }
                    , P = async e => {
                        try {
                            if (!e.target.files || !e.target.files[0] || !(null == i ? void 0 : i.shortId) || !s)
                                return;
                            C("");
                            let n = e.target.files[0];
                            try {
                                var t;
                                n = await (t = n,
                                    new Promise(e => {
                                            te().imageFileResizer(t, 1920, 1080, "JPEG", 100, 0, t => {
                                                    e(t)
                                                }
                                                , "file")
                                        }
                                    )),
                                    console.log("resized file: ".concat((n.size / 1024 / 1024).toFixed(1), "mb"))
                            } catch (e) {
                                console.error(e)
                            }
                            let r = await function(e, t, n, r) {
                                let s = new FormData;
                                return s.set("meta_app", "".concat(m.lw, "/comments")),
                                    s.set("meta_type", t),
                                    s.set("meta_id", n),
                                    s.set("meta_user", r.slice(-8)),
                                    s.set("file", e),
                                    e5(s)
                            }(n, s.type, String(null == s ? void 0 : s.id), i.shortId);
                            C(r.path),
                            b || Z("See attached image:)"),
                                e.target.value = "",
                                j.Z.increment("comment.upload_image", {
                                    result: "success",
                                    type: s.type
                                })
                        } catch (e) {
                            console.error(e),
                                N(e.message),
                                j.Z.increment("comment.upload_image", {
                                    result: "error"
                                })
                        }
                    }
                ;
                return (null == s ? void 0 : s.id) ? (0,
                    r.jsxs)("div", {
                    children: [!_ && (0,
                        r.jsxs)("div", {
                        className: "d-flex",
                        children: [(0,
                            r.jsx)("img", {
                            src: "".concat("https://game-cdn.appsample.com/gim", "/").concat("markers/{type}.png?v=1").replace("{type}", null == s ? void 0 : s.type),
                            style: {
                                width: "3rem",
                                height: "3rem",
                                backgroundColor: "rgba(0, 0, 0, 0.1)"
                            },
                            alt: "marker icon",
                            loading: "lazy"
                        }), (0,
                            r.jsxs)(z.Z, {
                            size: "small",
                            fullWidth: !0,
                            variant: "filled",
                            sx: {
                                mb: 1
                            },
                            children: [(0,
                                r.jsxs)(X.Z, {
                                htmlFor: "marker-url",
                                color: "secondary",
                                children: [I("markers.".concat(null == s ? void 0 : s.type)), " #", null == s ? void 0 : s.id]
                            }), (0,
                                r.jsx)(e8.Z, {
                                id: "marker-url",
                                type: "text",
                                size: "small",
                                value: L,
                                onFocus: e => e.target.select(),
                                endAdornment: (0,
                                    r.jsx)(Y.Z, {
                                    position: "end",
                                    children: (0,
                                        r.jsx)($.Z, {
                                        edge: "end",
                                        onClick: A,
                                        title: "Copy URL",
                                        children: (0,
                                            r.jsx)(e3.Z, {
                                            color: "primary"
                                        })
                                    })
                                }),
                                sx: {
                                    "&:before": {
                                        borderBottomColor: "transparent"
                                    }
                                }
                            })]
                        })]
                    }), s.level >= 4 ? (0,
                        r.jsxs)(r.Fragment, {
                        children: [(null == i ? void 0 : i.shortId) ? (0,
                            r.jsxs)("div", {
                            className: "mb-1",
                            children: [(0,
                                r.jsxs)("div", {
                                className: "d-flex align-items-center",
                                children: [(0,
                                    r.jsx)(eK.Z, {
                                    size: "small",
                                    sx: {
                                        flexGrow: 1,
                                        mr: .5
                                    },
                                    id: "outlined-multiline-flexible",
                                    label: (null === (t = m.sp.markerComments) || void 0 === t ? void 0 : t[s.type]) || "✍️ What are your thoughts?",
                                    multiline: !0,
                                    maxRows: 4,
                                    value: b,
                                    color: "primary",
                                    style: {
                                        backgroundColor: "#fff"
                                    },
                                    onChange: e => Z(e.target.value.slice(0, 140))
                                }), (0,
                                    r.jsxs)("label", {
                                    htmlFor: "icon-button-file",
                                    children: [(0,
                                        r.jsx)("input", {
                                        accept: "image/*",
                                        id: "icon-button-file",
                                        type: "file",
                                        hidden: !0,
                                        onChange: P,
                                        disabled: "" === k
                                    }), (0,
                                        r.jsx)(a.Z, {
                                        color: "info",
                                        variant: "contained",
                                        disableElevation: !0,
                                        "aria-label": "Upload an image",
                                        component: "span",
                                        title: "Upload an image",
                                        sx: {
                                            px: 1,
                                            minWidth: "1em"
                                        },
                                        children: (0,
                                            r.jsx)(e9.Z, {})
                                    })]
                                }), (0,
                                    r.jsx)(a.Z, {
                                    variant: "contained",
                                    color: "primary",
                                    disabled: b.length < 5,
                                    onClick: () => {
                                        if (b && i && s) {
                                            let e = Date.now();
                                            S.Gt.postComment({
                                                app: m.lw,
                                                categoryId: s.type,
                                                docId: String(s.id),
                                                authorUid: i.shortId,
                                                authorName: i.initial,
                                                content: b,
                                                lang: o,
                                                imageUrl: k || ""
                                            }).then( () => {
                                                    G((0,
                                                        f.PJ)({
                                                        t: ["msg.commentSubmitted"]
                                                    })),
                                                        Z(""),
                                                        C(null),
                                                        g(null);
                                                    let t = Date.now();
                                                    S.Gt.loadComments({
                                                        useProxy: !1,
                                                        app: m.lw,
                                                        categoryId: s.type,
                                                        docId: String(s.id),
                                                        lang: o,
                                                        sort: "time"
                                                    }).then(e => {
                                                            Array.isArray(e.comments) && g(e.comments)
                                                        }
                                                    ).catch(e => {
                                                            console.error("fail to get comments", e)
                                                        }
                                                    ).finally( () => {
                                                            j.Z.increment("comment.submit", {
                                                                type: s.type,
                                                                posttime: ta(t - e),
                                                                reloadtime: ta(Date.now() - t)
                                                            })
                                                        }
                                                    )
                                                }
                                            ).catch(e => {
                                                    G((0,
                                                        f.PJ)({
                                                        style: "error",
                                                        body: "Fail to submit comments"
                                                    }))
                                                }
                                            )
                                        }
                                    }
                                    ,
                                    sx: {
                                        ml: .5
                                    },
                                    children: I("ui.submit")
                                })]
                            }), !!T && (0,
                                r.jsx)(es.Z, {
                                className: "mt-2",
                                severity: "error",
                                sx: {
                                    mb: 3
                                },
                                children: T
                            }), "" === k && (0,
                                r.jsxs)("div", {
                                className: "text-center mt-2",
                                children: [(0,
                                    r.jsx)(x.Z, {
                                    size: "1.5em",
                                    sx: {
                                        verticalAlign: "middle",
                                        mr: 1
                                    }
                                }), "uploading, please wait ..."]
                            }), k && (0,
                                r.jsxs)("div", {
                                className: "text-center",
                                children: [(0,
                                    r.jsx)("img", {
                                    className: "mt-2 w-100 rounded",
                                    alt: "uploaded image",
                                    style: {
                                        minHeight: "8rem",
                                        background: "#EEE url(https://game-cdn.appsample.com/share/loading-64.gif) center top no-repeat"
                                    },
                                    src: "https://game-cdn.b-cdn.net".concat(k, "?width=600&quality=85")
                                }), (0,
                                    r.jsx)(a.Z, {
                                    color: "error",
                                    variant: "contained",
                                    title: "Delete screenshot",
                                    startIcon: (0,
                                        r.jsx)(e6.Z, {}),
                                    sx: {
                                        mt: "-50%"
                                    },
                                    onClick: () => C(null),
                                    children: "Remove Image"
                                })]
                            })]
                        }) : (0,
                            r.jsxs)(M.Z, {
                            variant: "body1",
                            textAlign: "center",
                            sx: {
                                my: 1
                            },
                            children: [(0,
                                r.jsx)(a.Z, {
                                size: "small",
                                color: "primary",
                                variant: "contained",
                                onClick: () => G((0,
                                    f.tW)(3)),
                                sx: {
                                    mr: 1,
                                    lineHeight: "1.25em"
                                },
                                children: "Sign In"
                            }), I("p.loginBeforeComment")]
                        }), (0,
                            r.jsx)("div", {
                            className: "striped-rows",
                            children: p ? (0,
                                r.jsxs)(r.Fragment, {
                                children: [p.length ? p.slice(0, v ? 999 : 50).map( (e, t) => (0,
                                    r.jsx)(tl, {
                                    data: e,
                                    type: s.type,
                                    id: String(s.id),
                                    rank: t + 1,
                                    lang: o
                                }, e.auid)) : (0,
                                    r.jsxs)(h.Z, {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    sx: {
                                        mt: 3,
                                        px: 3
                                    },
                                    children: [(0,
                                        m.N0)("ww") && (0,
                                        r.jsx)("img", {
                                        src: "".concat("https://game-cdn.appsample.com/gim", "/images/no-comment.png"),
                                        height: 64,
                                        alt: "No comments yet"
                                    }), (0,
                                        r.jsxs)(M.Z, {
                                        variant: "body2",
                                        align: "center",
                                        sx: {
                                            ml: 1
                                        },
                                        children: ["No comments yet... Why not be the first to leave your thoughts?", " "]
                                    })]
                                }), p.length > 50 && !v ? (0,
                                    r.jsx)(h.Z, {
                                    display: "flex",
                                    justifyContent: "center",
                                    children: (0,
                                        r.jsxs)(a.Z, {
                                        variant: "contained",
                                        size: "small",
                                        sx: {
                                            mt: 1
                                        },
                                        onClick: () => w(!0),
                                        children: ["show more (", p.length - 50, ")"]
                                    })
                                }) : null, to, (0,
                                    r.jsx)(eR, {
                                    onClick: n
                                })]
                            }) : (0,
                                r.jsx)("div", {
                                className: "py-3 text-center",
                                children: (0,
                                    r.jsx)(x.Z, {})
                            })
                        })]
                    }) : s.level >= 3 && s.img ? (0,
                        r.jsxs)("div", {
                        children: [(0,
                            r.jsx)("div", {
                            children: (0,
                                r.jsx)(ti, {
                                defer: !0,
                                src: "".concat("https://game-cdn.appsample.com/gim", "/").concat("item-imgs/{id}.jpg").replace("{id}", s.id)
                            })
                        }), (0,
                            r.jsxs)(M.Z, {
                            variant: "caption",
                            component: "div",
                            sx: {
                                my: 1,
                                lineHeight: 1.5
                            },
                            className: "hide-on-phone",
                            children: ["* ", I("p.commentNotAllowed")]
                        })]
                    }) : (0,
                        r.jsx)(es.Z, {
                        severity: "warning",
                        sx: {
                            mt: 2
                        },
                        children: "Comments are not supported for this marker."
                    })]
                }) : (0,
                    r.jsx)(es.Z, {
                    severity: "warning",
                    icon: (0,
                        r.jsx)(e4.Z, {}),
                    sx: {
                        mt: 3
                    },
                    children: I("p.pleaseSelectMarker")
                })
            }
            , tm = e => {
                let {isActive: t, scrollToTop: n} = e;
                return u.Z.render("WikiTab"),
                    (0,
                        r.jsxs)("div", {
                        children: [t && (0,
                            r.jsx)(m.WJ.Wiki, {}), (0,
                            r.jsx)(eR, {
                            onClick: n
                        })]
                    })
            }
        ;
        let tu = e => {
            let {index: t, currentIndex: n, children: s} = e
                , i = n === t;
            return (0,
                r.jsx)("div", {
                className: "".concat(i ? "d-block" : "d-none", " m-2"),
                style: {
                    height: i ? "auto" : 0
                },
                children: s
            })
        }
            , tp = (0,
            l.memo)(tu);
        var th = (0,
            l.memo)(e => {
                let {scrollRef: t} = e
                    , n = (0,
                    d.CG)(f.Ji)
                    , s = (0,
                    d.CG)(f.mu)
                    , i = (0,
                    d.TL)()
                    , a = (0,
                    l.useCallback)( () => {
                        try {
                            t.current && t.current.scrollTop > 48 && t.current.scrollTo({
                                top: 48,
                                behavior: "smooth"
                            })
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    , [t])
                    , o = e => n === e ? "secondary" : "primary";
                return (0,
                    r.jsxs)("div", {
                    className: "MapSidebarTabs",
                    children: [(0,
                        r.jsx)(G.Z, {
                        position: "sticky",
                        color: "default",
                        onClick: () => {
                            s && i((0,
                                f.UM)())
                        }
                        ,
                        elevation: 8,
                        children: (0,
                            r.jsxs)(O.Z, {
                            value: n,
                            onChange: (e, t) => {
                                i((0,
                                    f.tW)(t)),
                                    a()
                            }
                            ,
                            indicatorColor: "secondary",
                            variant: "fullWidth",
                            children: [(0,
                                r.jsx)(F.Z, {
                                title: "Markers",
                                "aria-label": "Markers",
                                icon: (0,
                                    r.jsx)(U.Z, {
                                    color: o(0)
                                }),
                                sx: {
                                    py: 0
                                }
                            }), (0,
                                r.jsx)(F.Z, {
                                title: "Comments",
                                "aria-label": "Comments",
                                icon: (0,
                                    r.jsx)(W.Z, {
                                    color: o(1)
                                }),
                                sx: {
                                    py: 0
                                }
                            }), (0,
                                r.jsx)(F.Z, {
                                title: "Characters",
                                "aria-label": "Characters",
                                icon: (0,
                                    r.jsx)(J.Z, {
                                    color: o(2)
                                }),
                                style: {
                                    display: (0,
                                        m.N0)("gim") ? "block" : "none"
                                },
                                sx: {
                                    py: 0
                                }
                            }), (0,
                                r.jsx)(F.Z, {
                                title: "Profile",
                                "aria-label": "Profile",
                                icon: (0,
                                    r.jsx)(H.Z, {
                                    color: o(3)
                                }),
                                sx: {
                                    py: 0
                                }
                            })]
                        })
                    }), (0,
                        r.jsx)(tp, {
                        currentIndex: n,
                        index: 0,
                        children: (0,
                            r.jsx)(eE, {
                            scrollToTop: a
                        })
                    }), (0,
                        r.jsx)(tp, {
                        currentIndex: n,
                        index: 1,
                        children: (0,
                            r.jsx)(td, {
                            scrollToTop: a
                        })
                    }), (0,
                        m.N0)("gim") && (0,
                        r.jsx)(tu, {
                        currentIndex: n,
                        index: 2,
                        children: (0,
                            r.jsx)(tm, {
                            scrollToTop: a,
                            isActive: 2 === n
                        })
                    }), (0,
                        r.jsx)(tp, {
                        currentIndex: n,
                        index: 3,
                        children: (0,
                            r.jsx)(e2, {
                            isActive: 3 === n
                        })
                    })]
                })
            }
        )
            , tx = () => {
            let e = (0,
                l.useRef)(null)
                , t = (0,
                d.CG)(f.Ji)
                , n = (0,
                y.tq)();
            return (0,
                r.jsx)("div", {
                className: "MapSidebar",
                children: (0,
                    r.jsxs)("div", {
                    className: "MapSidebar_Main",
                    ref: e,
                    children: [(!n || 0 === t) && (0,
                        r.jsx)(D, {}), (0,
                        r.jsx)(th, {
                        scrollRef: e
                    })]
                })
            })
        }
            , tg = n(4118)
            , tj = n(9572);
        let ty = (0,
            l.memo)(e => {
                let {mid: t} = e
                    , n = m.Gn[t].overlays || []
                    , s = eS(n, "sid", 1)
                    , i = (0,
                        d.TL)()
                    , a = (0,
                        d.CG)(c.sT)
                    , l = (0,
                        d.CG)(c.fh)
                    , o = e => {
                        i((0,
                            c.TK)(e)),
                            (0,
                                g.Xv)(),
                            (0,
                                g.Xc)(e),
                            (0,
                                g.Rk)((0,
                                c.kV)(a), !1)
                    }
                ;
                return s.length > 1 ? (0,
                    r.jsx)(r.Fragment, {
                    children: n.map(e => (0,
                        r.jsx)(L.Z, {
                        onClick: () => o(e.sid),
                        title: "Switch Floor",
                        children: (0,
                            r.jsx)(ew.Z, {
                            children: (0,
                                r.jsx)(ek.Z, {
                                variant: "rounded",
                                sx: {
                                    width: 24,
                                    height: 24,
                                    fontSize: 12,
                                    bgcolor: l === e.sid ? "secondary.main" : "grey"
                                },
                                children: e.name
                            })
                        })
                    }, e.sid))
                }) : null
            }
        );
        var tv = n(4005)
            , tf = n(2288)
            , tw = n(8318);
        let tb = (e, t) => {
                window._mapPanTo(e, t)
            }
        ;
        var tZ = (0,
            l.memo)( () => {
                var e;
                let t = (0,
                    d.TL)()
                    , n = (0,
                    d.CG)(c.g$)
                    , s = (0,
                    d.CG)(f.mu)
                    , i = (0,
                    d.CG)(c.sT)
                    , a = e => {
                    t((0,
                        c.JJ)([e]))
                }
                    , l = ["sr"].includes(m.lw) ? [] : Object.entries(m.Fe);
                return (0,
                    r.jsx)("div", {
                    className: "MapSidebarMenu",
                    children: (0,
                        r.jsxs)(tg.Z, {
                        children: [(0,
                            r.jsx)(L.Z, {
                            onClick: () => t((0,
                                f.UM)()),
                            children: (0,
                                r.jsx)(ew.Z, {
                                children: s ? (0,
                                    r.jsx)(eT.Z, {}) : (0,
                                    r.jsx)(tj.Z, {})
                            })
                        }), (0,
                            r.jsx)(eW.Z, {}), (0,
                            r.jsx)(ez, {
                            variant: "icon",
                            mid: n
                        }), (0,
                            r.jsx)(L.Z, {
                            onClick: () => window._mapSetZoom("in"),
                            title: "Zoom in",
                            children: (0,
                                r.jsx)(ew.Z, {
                                children: (0,
                                    r.jsx)(tv.Z, {})
                            })
                        }), (0,
                            r.jsx)(L.Z, {
                            onClick: () => window._mapSetZoom("out"),
                            title: "Zoom out",
                            children: (0,
                                r.jsx)(ew.Z, {
                                children: (0,
                                    r.jsx)(tf.Z, {})
                            })
                        }), (0,
                            r.jsx)(L.Z, {
                            onClick: () => t((0,
                                c.pO)({
                                types: Object.entries(i).filter(e => {
                                        let[t,n] = e;
                                        return n
                                    }
                                ).map(e => {
                                        let[t,n] = e;
                                        return t
                                    }
                                ),
                                status: !1
                            })),
                            title: "clear all markers",
                            children: (0,
                                r.jsx)(ew.Z, {
                                children: (0,
                                    r.jsx)(tw.Z, {})
                            })
                        }), ["sr"].includes(m.lw) && (0,
                            r.jsx)(ty, {
                            mid: n
                        }), l.length > 1 && (0,
                            r.jsx)(eW.Z, {}), l.map(e => {
                                let[t,s] = e;
                                return (0,
                                    r.jsx)(L.Z, {
                                    className: n === Number(t) ? "active" : "",
                                    onClick: () => a(Number(t)),
                                    title: "".concat(s, " Map"),
                                    children: (0,
                                        r.jsx)(ew.Z, {
                                        children: (0,
                                            r.jsx)("img", {
                                            className: "inline-icon",
                                            src: "".concat("https://game-cdn.appsample.com/gim", "/icons/map-").concat(t, ".png"),
                                            alt: s,
                                            loading: "lazy"
                                        })
                                    })
                                }, t)
                            }
                        ), m.Gn[n].areas && (0,
                            r.jsx)(eW.Z, {}), null === (e = m.Gn[n].areas) || void 0 === e ? void 0 : e.map(e => (0,
                            r.jsx)(L.Z, {
                            onClick: () => tb(e.lat, e.lng),
                            title: "".concat(e.title, " Map"),
                            children: (0,
                                r.jsx)(ew.Z, {
                                children: (0,
                                    r.jsx)("img", {
                                    className: "inline-icon",
                                    src: "".concat("https://game-cdn.appsample.com/gim", "/icons/").concat(e.icon),
                                    alt: "Mondstadt",
                                    loading: "lazy"
                                })
                            })
                        }, e.title))]
                    })
                })
            }
        )
            , tk = (0,
            l.memo)( () => (0,
            r.jsx)("div", {
            className: "text-center",
            children: (0,
                r.jsx)("img", {
                className: "for-desktop",
                src: "".concat("https://game-cdn.appsample.com/gim", "/images/450x300-welcome.jpg"),
                alt: "placeholder image",
                width: 300,
                height: 200,
                style: {
                    backgroundColor: "rgba(0,0,0,0.1)"
                }
            })
        }))
            , tC = n(2499)
            , tT = n(992)
            , tN = n(188);
        let tS = ["desktop"]
            , tI = ["tablet"]
            , tG = Number("1")
            , t_ = "nc"
            , tM = "br".concat(tG);
        switch (tG) {
            case 2:
                t_ = Math.random() > 10 / 11 ? "float" : "nc";
                break;
            case 3:
                t_ = Math.random() > 10 / 11 ? "nc" : "float";
                break;
            default:
                t_ = Math.random() > .5 ? "float" : "nc"
        }
        console.log("AB_TEST", t_, tM);
        var tz = e => {
            let {filter: t=["*"]} = e
                , n = (0,
                d.CG)(eL.Q_);
            return (0,
                r.jsx)(h.Z, {
                sx: {
                    pt: 2,
                    pr: 2,
                    pb: 1,
                    pl: 1,
                    backgroundColor: "#e6e6e6"
                },
                children: Object.entries(n).map(e => {
                        let[n,s] = e;
                        return t.includes("*") || t.includes(n) ? (0,
                            r.jsx)(eq, {
                            name: n,
                            value: s.found,
                            total: s.total,
                            icon: "".concat("https://game-cdn.appsample.com/gim", "/").concat("markers/{type}.png?v=1").replace("{type}", n)
                        }, n) : null
                    }
                )
            })
        }
            , tL = (0,
            l.memo)(e => {
                let {adTypes: t, videoType: n} = e;
                return (0,
                    r.jsx)("div", {
                    className: "MapRightbar",
                    children: (0,
                        r.jsxs)("div", {
                        className: "MapRightbar_Main",
                        children: [(0,
                            r.jsx)(eJ, {
                            className: "my-3 two-col"
                        }), t.includes("fix") && (0,
                            r.jsx)(tC.Z, {
                            placement: "br",
                            devices: tS,
                            size: "300x250"
                        }), t.includes("video") && (0,
                            r.jsxs)(h.Z, {
                            sx: {
                                position: "sticky",
                                top: "12px",
                                bottom: "12px",
                                my: 1,
                                zIndex: 2
                            },
                            children: ["nc" === n && (0,
                                r.jsx)(tT.Z, {
                                placement: tM,
                                devices: tS
                            }), "float" === n && (0,
                                r.jsx)(tN.Z, {
                                placement: tM,
                                devices: tS
                            })]
                        }), 0 !== t.length || (0,
                            m.N0)("gim") ? null : (0,
                            r.jsx)(tk, {}), m.sp.rightBarProgress && (0,
                            r.jsx)(h.Z, {
                            sx: {
                                mt: 1
                            },
                            children: (0,
                                r.jsx)(tz, {
                                filter: m.sp.rightBarProgress
                            })
                        }), (0,
                            m.N0)("gim") && (0,
                            r.jsx)(h.Z, {
                            sx: {
                                mt: 1
                            },
                            children: (0,
                                r.jsx)(m.WJ.DailyMaterials, {})
                        })]
                    })
                })
            }
        )
            , tA = e => {
            let {sidebar: t=null, sidebarMenu: n=null} = e
                , s = (0,
                d.CG)(f.mu)
                , i = (0,
                d.CG)(f.sL)
                , o = (0,
                d.TL)()
                , [c,u] = (0,
                l.useState)((0,
                m.N0)("ww") ? [] : ["video", "fix"])
                , [p,h] = (0,
                l.useState)(t_);
            return (0,
                l.useEffect)( () => {
                    if (window.location.href.includes("__noad")) {
                        u([]);
                        return
                    }
                    (I(!1) || 0) > 1.5 && (0,
                        m.N0)("ww") && u(["video", "fix"]);
                    let e = window.setTimeout( () => {
                            c.includes("video") && (u(c.filter(e => "video" !== e)),
                                j.Z.increment100("nitro.video2fix", {
                                    timer: "114m"
                                }))
                        }
                        , 684e4)
                        , t = window.setTimeout( () => {
                            let e = {
                                script: null,
                                video: null,
                                videoType: t_
                            };
                            try {
                                if (3 === Object.keys(window.nitroAds).length ? e.script = !1 : e.script = !0,
                                "nc" === p) {
                                    let t = document.querySelector("[id^=pc-".concat(tM, "-nc-").concat(m.lw, "-container]"));
                                    t && t.shadowRoot && t.shadowRoot.innerHTML && (t.shadowRoot.innerHTML.includes("<video") ? e.video = !0 : e.video = !1)
                                }
                                "float" === p && document.getElementById("pc-".concat(tM, "-float-").concat(m.lw)) && (e.video = !!document.querySelector("#pc-".concat(tM, "-float-").concat(m.lw, " div")))
                            } catch (e) {
                                console.error(e)
                            }
                            console.log(JSON.stringify(e)),
                                !1 === e.script ? (u([]),
                                    j.Z.increment100("nitro.init", e)) : !1 === e.video && (console.log("video2fix"),
                                    u(c.filter(e => "video" !== e)),
                                    j.Z.increment100("nitro.video2fix", {
                                        timer: "8s"
                                    }),
                                    j.Z.increment100("nitro.init", e),
                                    window.setTimeout( () => {
                                            (0,
                                                m.N0)("ww") || u([...c, "video"])
                                        }
                                        , 12e4));
                            let t = (0,
                                y.tq)() ? 16 : 2;
                            !1 === e.script && (t = 12),
                                window.setTimeout( () => {
                                        j.Z.increment100("page.reload", {
                                            hour: t
                                        }),
                                            window.setTimeout( () => (0,
                                                v.Uo)(["map"]), 5e3)
                                    }
                                    , 3600 * t * 1e3)
                        }
                        , 8e3);
                    return () => {
                        window.clearTimeout(e),
                            window.clearTimeout(t)
                    }
                }
                , []),
                (0,
                    r.jsxs)("div", {
                    className: "MapLayout",
                    children: [(0,
                        r.jsxs)("div", {
                        className: "MapLayout_Sidebar ".concat(s ? "hide" : ""),
                        children: [(0,
                            r.jsx)(tx, {}), (0,
                            r.jsx)(tZ, {}), (0,
                            r.jsx)(a.Z, {
                            variant: "contained",
                            size: "small",
                            color: "info",
                            className: "MapLayout_Sidebar_CollapseBtn",
                            onClick: () => o((0,
                                f.UM)()),
                            "aria-label": "hide/show",
                            children: s ? (0,
                                r.jsx)(T.Z, {}) : (0,
                                r.jsx)(C.Z, {})
                        })]
                    }), (0,
                        r.jsx)("div", {
                        className: "MapLayout_Rightbar ".concat(i ? "hide" : ""),
                        children: (0,
                            r.jsx)(tL, {
                            adTypes: c,
                            videoType: p
                        })
                    }), (0,
                        r.jsx)("div", {
                        className: "MapLayout_Map",
                        children: (0,
                            r.jsx)(Z, {})
                    }), c.length > 0 && (0,
                        r.jsxs)(r.Fragment, {
                        children: [(0,
                            r.jsx)("div", {
                            className: "MapLayout_Tablet",
                            children: (0,
                                r.jsx)(tN.Z, {
                                placement: "bl",
                                devices: tI
                            })
                        }), (0,
                            r.jsx)("div", {
                            className: "MapLayout_Mobile",
                            children: (0,
                                r.jsx)(N.Z, {})
                        })]
                    }), (0,
                        r.jsx)(k, {}), !1]
                })
        }
            , tP = n(1441)
            , tR = n(8618);
        let tE = "\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '".concat("G-JVH51BJ566", "');\n");
        var tD = e => {
            var t;
            let {lang: n="en"} = e
                , s = (0,
                d.TL)()
                , [a,o] = (0,
                l.useState)(!1)
                , c = (0,
                f.pW)(n);
            return (0,
                l.useEffect)( () => {
                    eU.Z.syncSignIn(e => {
                            u.Z.debug("syncSignIn()"),
                                s((0,
                                    eL.av)(e)),
                                s((0,
                                    f.PJ)({
                                    t: ["msg.welcomeBack", e.name]
                                })),
                                e.uid ? eU.Z.get("users", e.uid).then(e => {
                                        let t = (null == e ? void 0 : e.markerIds) || [];
                                        (0,
                                            tP.wm)(t),
                                            (0,
                                                g.LA)(),
                                            j.Z.increment100("firestore.marker_loaded", {
                                                count: Math.ceil(t.length / 100)
                                            }),
                                            u.Z.debug("\uD83C\uDFC3user found data loaded")
                                    }
                                ).catch(e => {
                                        s((0,
                                            f.PJ)({
                                            style: "error",
                                            body: "Database connection error: " + e.message
                                        }))
                                    }
                                ) : s((0,
                                    f.PJ)({
                                    style: "error",
                                    body: "Failed to load your account, please refresh page"
                                }))
                        }
                    );
                    let e = I();
                    console.log("".concat(e, " days")),
                        j.Z.increment100("session.age", {
                            days: null === e ? null : Math.floor(e),
                            referrer: (0,
                                v.an)()
                        }),
                    e || (0,
                        tR.BQ)(),
                        (0,
                            tP.hh)()
                }
                , []),
                (0,
                    l.useEffect)( () => {
                        o(!0),
                        (0,
                            v.u9)() && j.Z.increment10("session.framed")
                    }
                    , []),
                (0,
                    r.jsxs)(r.Fragment, {
                    children: [(0,
                        r.jsxs)(i(), {
                        children: [(0,
                            r.jsx)("meta", {
                            name: "viewport",
                            content: "width=device-width, user-scalable=no"
                        }), (0,
                            r.jsx)("meta", {
                            "http-equiv": "refresh",
                            content: "259200"
                        }), (0,
                            r.jsx)("link", {
                            rel: "icon",
                            href: "".concat(m.GW, "favicon.ico")
                        }), (0,
                            r.jsx)("link", {
                            rel: "preconnect",
                            href: "https://maps.googleapis.com"
                        }), (0,
                            r.jsx)("link", {
                            rel: "preconnect",
                            href: "https://game-data.lemonapi.com"
                        }), (0,
                            r.jsx)("link", {
                            rel: "preconnect",
                            href: "https://".concat("https://game-cdn.appsample.com/gim".split("/")[2])
                        }), (0,
                            r.jsx)("link", {
                            rel: "preconnect",
                            href: "https://s.nitropay.com"
                        }), (0,
                            r.jsx)("title", {
                            children: c("meta.homeTitle") || c("meta.title")
                        }), (0,
                            r.jsx)("meta", {
                            name: "keywords",
                            content: m.h5.keywords
                        }), (0,
                            r.jsx)("meta", {
                            name: "description",
                            content: c("meta.longDesc")
                        }), (0,
                            r.jsx)("meta", {
                            property: "og:type",
                            content: "website"
                        }), (0,
                            r.jsx)("meta", {
                            property: "og:title",
                            content: c("meta.title")
                        }), (0,
                            r.jsx)("meta", {
                            property: "og:description",
                            content: c("meta.desc")
                        }), (0,
                            r.jsx)("meta", {
                            property: "og:image",
                            content: m.h5.image
                        }), (0,
                            r.jsx)("meta", {
                            property: "twitter:card",
                            content: "summary_large_image"
                        }), (0,
                            r.jsx)("meta", {
                            property: "twitter:title",
                            content: c("meta.title")
                        }), (0,
                            r.jsx)("meta", {
                            property: "twitter:description",
                            content: c("meta.desc")
                        }), (0,
                            r.jsx)("meta", {
                            property: "twitter:image",
                            content: m.h5.image
                        }), (0,
                            r.jsx)("meta", {
                            name: "thumbnail",
                            content: m.h5.image
                        }), (0,
                            m.N0)("ww2") && (0,
                            r.jsx)("link", {
                            rel: "canonical",
                            href: "https://genshin-impact-map.appsample.com/wuthering-waves-map/"
                        }), (0,
                            r.jsx)("script", {
                            "data-cfasync": "false",
                            dangerouslySetInnerHTML: {
                                __html: 'window.nitroAds=window.nitroAds||{createAd:function(){return new Promise(e=>{window.nitroAds.queue.push(["createAd",arguments,e])})},addUserToken:function(){window.nitroAds.queue.push(["addUserToken",arguments])},queue:[]};'
                            }
                        }), (0,
                            r.jsx)("script", {
                            dangerouslySetInnerHTML: {
                                __html: tE
                            }
                        }), null === (t = m.Gn[m.dy].urlPrefetch) || void 0 === t ? void 0 : t.map(e => (0,
                            r.jsx)("link", {
                            rel: "preload",
                            href: e,
                            as: "image"
                        }, e)), (0,
                            r.jsx)("style", {
                            dangerouslySetInnerHTML: {
                                __html: '\n.LoadingRing{display:inline-block;width:1em;height:1em;margin-right:0.75em}\n.LoadingRing:after{content:" ";display:block;width:.75em;height:.75em;border-radius:50%;border:.25em solid #999;border-color:#999 #ccc;animation:1s linear infinite lds-dual-ring}\n@keyframes lds-dual-ring{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}\n'
                            }
                        })]
                    }), a ? (0,
                        r.jsx)(tA, {}) : (0,
                        r.jsxs)("div", {
                        style: {
                            padding: "2rem",
                            lineHeight: 2
                        },
                        children: [(0,
                            r.jsx)("span", {
                            className: "LoadingRing"
                        }), "Loading ", c("meta.title"), "... [", (0,
                            r.jsx)("a", {
                            href: m.GW,
                            children: "Takes too long? Reload Page"
                        }), "]"]
                    }), ["gim", "sr", "ww"].includes(m.lw) && (0,
                        r.jsx)("script", {
                        "data-cfasync": "false",
                        defer: !0,
                        src: "https://s.nitropay.com/ads-839.js"
                    }), ["tof"].includes(m.lw) && (0,
                        r.jsx)("script", {
                        "data-cfasync": "false",
                        defer: !0,
                        src: "https://s.nitropay.com/ads-1317.js"
                    }), (0,
                        r.jsx)("script", {
                        defer: !0,
                        src: "https://www.googletagmanager.com/gtag/js?id=G-JVH51BJ566"
                    })]
                })
        }
    },
    8618: function(e, t, n) {
        n.d(t, {
            BQ: function() {
                return o
            },
            Tq: function() {
                return l
            },
            ix: function() {
                return c
            }
        });
        var r = n(1251)
            , s = n(6543)
            , i = n(5237);
        let a = "https://data.mongodb-api.com/app/skywise-sl-lptdr/endpoint/referral/v1?action=";
        function l(e, t) {
            return r.od.post(a + "status", {
                email: e,
                uid: t
            })
        }
        function o() {
            if ((0,
                i.jU)()) {
                let e = new URLSearchParams(window.location.search).get("r");
                e && (console.log("waiting for 15s to fire referral event"),
                    window.setTimeout( () => {
                            s.Z.increment100("session.referred"),
                                r.od.post(a + "referred", {
                                    referrerId: e
                                }).then( () => console.log("referred")).catch( () => console.log("referred error"))
                        }
                        , 15e3))
            }
        }
        function c() {
            return r.od.get(a + "winners")
        }
    }
}]);
