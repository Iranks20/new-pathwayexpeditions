import ActivityCard from "./ActivityCard";
import { Camera, Leaf, Mountain, Users, Ship, Binoculars } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cloudinaryOptimize } from "@/lib/utils";
import ImageLightbox from "./ImageLightbox";
const fallbackImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const gorillaFallback = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg";
const culturalFallback = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const birdFallback = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338327/bird_23_tquh0l.jpg";
const boatFallback = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340724/boat_13_rtn8wm.jpg";
const natureFallbackImg = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";

const activities = [
  {
    icon: Camera,
    title: "Wildlife Safaris",
    description: "Experience close encounters with Uganda's iconic wildlife species."
  },
  {
    icon: Mountain,
    title: "Gorilla Trekking",
    description: "Journey through forests for a rare glimpse of mountain gorillas."
  },
  {
    icon: Binoculars,
    title: "Bird Watching",
    description: "Spot diverse bird species in Uganda's rich natural habitats."
  },
  {
    icon: Users,
    title: "Cultural Tours",
    description: "Immerse yourself in Uganda's vibrant traditions and heritage."
  },
  {
    icon: Ship,
    title: "Boat Cruises",
    description: "Relax on scenic waterways with breathtaking views and wildlife."
  },
  {
    icon: Leaf,
    title: "Nature Walks",
    description: "Explore pristine landscapes and discover hidden natural wonders."
  }
];

// Cloudinary sequences for activity sliders (explicit lists provided by user)
const cloudSequences: Record<string, string[]> = {
  "Nature Walks": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766341050/nature_walks_8_oikvsq.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766341020/nature_walks_19_dnptus.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766341013/nature_walks_15_slhfvs.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766341007/nature_walks_17_acqsym.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766341005/nature_walks_18_sp7dnp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340999/nature_walks_16_yvbdmt.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340992/nature_walks_14_gyklbf.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340991/nature_walks_12_dwsqlr.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340987/nature_walks_13_fonq04.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340986/nature_walks_10_mbl0ye.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340984/nature_walks_9_jieazz.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340973/nature_walks_7_gjpk9a.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340969/nature_walks_11_tzffas.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_3_edkqjc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_1_z3f1q3.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340943/nature_walks_5_ajbevw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340939/nature_walks_4_mhiim4.jpg",
  ],

  "Boat Cruises": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340724/boat_13_rtn8wm.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340720/boat_17_n8r0ki.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340716/boat_10_kw2jqg.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340713/boat_18_py0y6x.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340707/boat_16_phxhlt.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340701/boat_15_hyxe9c.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340699/boat_12_qatxv3.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340693/boat_14_iwc2k0.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340677/boat_8_apoiyf.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340676/boat_11_gxfdi7.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340672/boat_1_jkgudg.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340670/boat_6_ibtlkq.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340669/boat_9_uyv9rl.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340655/boat_4_sf2x2s.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340641/boat_7_jvpz7h.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340640/boat_3_fn6wbe.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340631/boat_5_cw4s2x.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340625/boat_2_gjwhc4.jpg",
  ],

  "Cultural Tours": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340305/culture_33_xzhpbq.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340242/culture_32_h4uxvd.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340234/culture_24_vzm596.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340234/culture_29_awo3tk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340233/culture_27_y4k1me.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340229/culture_31_w8jwbs.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340229/culture_28_ugbmyn.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340212/culture_26_yumulr.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340204/culture_23_cy5frl.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340191/culture_25_pdttzv.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339917/culture_20_haceqj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339910/culture_22_ti2dp2.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339901/culture_21_ahvvgz.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339877/culture_17_paa37b.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339872/culture_5_et9evp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339868/culture_16_iofxrk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339865/culture_10_mc5ehi.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339863/culture_19_ahx6hp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339862/culture_18_s1u3gb.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339844/culture_15_smmje4.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339838/culture_14_vzd4zw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339835/culture_11_evjlh6.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339834/culture_12_m7qaou.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339828/culture_13_b0q9xq.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339804/culture_6_xibey6.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339802/culture_2_niunfh.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339800/culture_7_omaddc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339798/culture_3_tvcrjs.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339785/culture_8_da4cz8.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339769/culture_1_tq1far.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339771/culture_4_ifgmru.jpg",
  ],

  "Gorilla Trekking": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339554/gorilla_24_ajx0jo.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339548/gorilla_26_vvokga.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339518/gorilla_23_xwixn3.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339518/gorilla_23_xwixn3.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339504/gorilla_18_ss2qwl.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339496/gorilla_25_winprp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339491/gorilla_22_euizvb.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339491/gorilla_21_vcvgyp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339484/gorilla_17_nezaq8.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339483/gorilla_19_ctgqvp.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339466/gorilla_16_qizqqc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339465/gorilla_20_ohhqln.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339449/gorilla_2_wx79xj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339440/gorilla_13_n4xsfh.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339439/gorilla_14_lflnl8.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339430/gorilla_15_k2aydh.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339413/gorilla_10_y9u4h2.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339405/gorilla_12_yrbogk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339404/gorilla_9_egztez.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339401/gorilla_11_gjkwlx.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339392/gorilla_8_exuo6a.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339380/gorilla_3_btjdfk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339366/gorilla_26_vpfime.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339365/gorilla_4_rno9ax.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339364/gorilla_5_pwi1df.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339365/gorilla_6_o8ajxi.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339344/gorilla_1_jiazzw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339343/gorilla_24_mafynm.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339316/gorilla_23_qcqzxa.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339308/gorilla_18_o5nfaa.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339296/gorilla_17_mv3gwj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339291/gorilla_25_bpnsrj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339290/gorilla_22_s7q1zj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339275/gorilla_21_ureufa.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339274/gorilla_19_ofsswn.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339267/gorilla_16_aqsv62.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339264/gorilla_20_ucszos.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339244/gorilla_14_cs425c.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339243/gorilla_15_abfb2a.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339227/gorilla_10_m3npsl.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339221/gorilla_9_ygfrdy.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339217/gorilla_13_fkslgx.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339204/gorilla_8_eickil.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339204/gorilla_11_fgji13.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339194/gorilla_12_btdvfa.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339148/gorilla_2_elwmwf.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339101/gorilla_3_zfzuxw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339099/gorilla_4_yeej2s.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339090/gorilla_1_gsdzss.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339081/gorilla_6_rgzahr.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339077/gorilla_5_uhbqtv.jpg"
  ],

    "Wildlife Safaris": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338865/wildlife_33_vq2dgg.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338844/wildlife_28_e8oa1k.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338841/wildlife_34_r9ewoc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338823/wildlife_32_yzxnyz.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338818/wildlife_30_biojjd.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338811/wildlife_31_i182sd.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338809/wildlife_25_sueadt.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338795/wildlife_29_hnpnri.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338792/wildlife_24_j0megt.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338787/wildlife_27_mqhfpo.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338786/wildlife_26_u16cxh.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338763/wildlife_21_mfm5ne.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338745/wildlife_14_w6hzw2.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338744/wildlife_20_qwixks.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338743/wildlife_23_uy1u7t.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338736/wildlife_22_gxaaxe.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338735/wildlife_15_jwolul.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338731/wildlife_17_kqfkdk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338725/wildlife_18_fqg30g.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338724/wildlife_16_cax3lx.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338724/wildlife_19_wbofly.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338707/wildlife_11_zjz2bu.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_9_qfkw5b.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338690/wildlife_12_umcnzx.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338681/wildlife_6_vlpi8q.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338680/wildlife_5_hro0ta.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338675/wildlife_10_ckkxb5.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338673/wildlife_8_wsuwol.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338658/wildlife_4_etgoht.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338648/wildlife_7_fu6g3q.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338538/wildlife_3_btbtpk.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338522/wildlife_1_ckl1qc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338522/wildlife_2_z9pign.jpg",
  ],

  "Bird Watching": [
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338327/bird_23_tquh0l.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338314/bird_29_wjch9e.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338297/bird_30_p2x13h.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338285/bird_25_pe7cv2.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338284/bird_27_mdvyax.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338283/bird_28_a7gzzt.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338270/bird_21_t69ipm.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338269/bird_26_sudeg8.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338261/bird_24_ppan5y.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338255/bird_22_efnb2b.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338251/bird_18_gfjwqq.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338251/bird_20_zyx9uj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338246/bird_19_cmgth6.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338243/bird_13_egscx6.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338236/bird_2_dapv9g.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338235/bird_14_nbanvn.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338221/bird_16_q9whr8.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338215/bird_17_h4rq9m.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338212/bird_15_llyatj.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338200/bird_12_iytbca.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338195/bird_7_lwfptn.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338185/bird_11_k5j721.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338181/bird_8_usho7v.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338173/bird_6_stcimc.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338170/bird_10_gkgabi.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338142/bird_4_jh3ild.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338141/bird_9_iozgjw.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338120/bird_3_nlyraa.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338115/bird_5_wwkjr6.jpg",
    "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338113/bird_1_pvsz4w.jpg",
  ],
};

export default function ActivitiesSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  // mapping of activity title to folder names under @assets/generated_images
  const folderMap: Record<string, string> = {
    "Wildlife Safaris": "Wildlife Safaris",
    "Gorilla Trekking": "gorilla-trekking",
    "Bird Watching": "bird watching",
    "Cultural Tours": "cultural-heritage",
    "Boat Cruises": "boat cruises",
    "Nature Walks": "nature walks",
  };
  // Preload thumbnails and image arrays for each activity using static imports to satisfy Vite globbing
  const activityAssets = useMemo(() => {
    const map: Record<string, { images: string[]; thumbnail?: string; folder?: string }> = {};
    const tryImportImages = (folderCandidates: string[]) => {
      for (const f of folderCandidates) {
        try {
          const modules = (import.meta as any).globEager(`@assets/generated_images/${f}/*.{jpg,jpeg,png,webp}`) as Record<string, any>;
          const imgs = Object.values(modules).map((m) => m?.default).filter(Boolean) as string[];
          if (imgs.length > 0) {
            return { images: imgs, thumbnail: imgs[0], folder: `@assets/generated_images/${f}` };
          }
        } catch (e) {
          // Try next candidate
        }

        try {
          const modules = (import.meta as any).globEager(`@/components/${f}/*.{jpg,jpeg,png,webp}`) as Record<string, any>;
          const imgs = Object.values(modules).map((m) => m?.default).filter(Boolean) as string[];
          if (imgs.length > 0) {
            return { images: imgs, thumbnail: imgs[0], folder: `@/components/${f}` };
          }
        } catch (e) {
          // Try next candidate
        }
      }
      return { images: [], thumbnail: undefined, folder: folderCandidates[0] };
    };

    // Wildlife Safaris (prefer Cloudinary sequence)
    {
      if (cloudSequences['Wildlife Safaris'] && cloudSequences['Wildlife Safaris'].length > 0) {
        // create small and full versions for performance
        const small = cloudSequences['Wildlife Safaris'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Wildlife Safaris'].map((u) => cloudinaryOptimize(u, 1600));
        map['Wildlife Safaris'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Wildlife Safaris:', small.length, 'images');
      } else {
        const candidateFolders = ["Wildlife Safaris", "wildlife-safaris", "wildlife_safaris", "Wildlife_safari"];
        const { images, thumbnail, folder } = tryImportImages(candidateFolders);
        if (images.length > 0) {
          map['Wildlife Safaris'] = { images, thumbnail, folder };
          console.log('Matched Wildlife Safaris folder:', folder, images.length, 'images');
        } else {
          map['Wildlife Safaris'] = { images: [fallbackImage], thumbnail: fallbackImage, folder: 'fallback' };
          console.warn('No images found for Wildlife Safaris; using fallback');
        }
      }
    }
    // Gorilla Trekking (prefer Cloudinary sequence)
    {
      if (cloudSequences['Gorilla Trekking'] && cloudSequences['Gorilla Trekking'].length > 0) {
        const small = cloudSequences['Gorilla Trekking'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Gorilla Trekking'].map((u) => cloudinaryOptimize(u, 1600));
        map['Gorilla Trekking'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Gorilla Trekking:', small.length, 'images');
      } else {
        const candidateFolders = ["gorilla-trekking", "gorilla trekking", "gorilla_trekking", "gorilla-trekking"];
        const { images, thumbnail, folder } = tryImportImages(candidateFolders);
        if (images.length > 0) {
          map['Gorilla Trekking'] = { images, thumbnail, folder };
          console.log('Matched Gorilla Trekking folder:', folder, images.length, 'images');
        } else {
          map['Gorilla Trekking'] = { images: [gorillaFallback], thumbnail: gorillaFallback, folder: 'fallback' };
          console.warn('No images found for Gorilla Trekking; using fallback');
        }
      }
    }
    // Bird Watching (prefer Cloudinary sequence)
    {
      if (cloudSequences['Bird Watching'] && cloudSequences['Bird Watching'].length > 0) {
        const small = cloudSequences['Bird Watching'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Bird Watching'].map((u) => cloudinaryOptimize(u, 1600));
        map['Bird Watching'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Bird Watching:', small.length, 'images');
      } else {
        const candidateFolders = ["bird watching", "bird-watching", "bird_watching", "birdwatching"];
        const { images, thumbnail, folder } = tryImportImages(candidateFolders);
        if (images.length > 0) {
          map['Bird Watching'] = { images, thumbnail, folder };
          console.log('Matched Bird Watching folder:', folder, images.length, 'images');
        } else {
          map['Bird Watching'] = { images: [birdFallback], thumbnail: birdFallback, folder: 'fallback' };
          console.warn('No images found for Bird Watching; using fallback');
        }
      }
    }
    // Cultural Tours (prefer Cloudinary sequence; note: skip image 30 as requested)
    {
      if (cloudSequences['Cultural Tours'] && cloudSequences['Cultural Tours'].length > 0) {
        const small = cloudSequences['Cultural Tours'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Cultural Tours'].map((u) => cloudinaryOptimize(u, 1600));
        map['Cultural Tours'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Cultural Tours:', small.length, 'images');
      } else {
        const candidateFolders = ["cultural-heritage", "cultural heritage", "cultural_heritage"];
        const { images, thumbnail, folder } = tryImportImages(candidateFolders);
        if (images.length > 0) {
          map['Cultural Tours'] = { images, thumbnail, folder };
          console.log('Matched Cultural Tours folder:', folder, images.length, 'images');
        } else {
          map['Cultural Tours'] = { images: [culturalFallback], thumbnail: culturalFallback, folder: 'fallback' };
          console.warn('No images found for Cultural Tours; using fallback');
        }
      }
    }
    // Boat Cruises (prefer Cloudinary sequence)
    {
      if (cloudSequences['Boat Cruises'] && cloudSequences['Boat Cruises'].length > 0) {
        const small = cloudSequences['Boat Cruises'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Boat Cruises'].map((u) => cloudinaryOptimize(u, 1600));
        map['Boat Cruises'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Boat Cruises:', small.length, 'images');
      } else {
        const candidateFolders = ["boat cruises", "boat-cruises", "boat_cruises", "boatcruises"];
        const { images, thumbnail, folder } = tryImportImages(candidateFolders);
        if (images.length > 0) {
          map['Boat Cruises'] = { images, thumbnail, folder };
          console.log('Matched Boat Cruises folder:', folder, images.length, 'images');
        } else {
          map['Boat Cruises'] = { images: [boatFallback], thumbnail: boatFallback, folder: 'fallback' };
          console.warn('No images found for Boat Cruises; using fallback');
        }
      }
    }
    // Nature Walks (prefer Cloudinary sequence)
    {
      if (cloudSequences['Nature Walks'] && cloudSequences['Nature Walks'].length > 0) {
        const small = cloudSequences['Nature Walks'].map((u) => cloudinaryOptimize(u, 600));
        const full = cloudSequences['Nature Walks'].map((u) => cloudinaryOptimize(u, 1600));
        map['Nature Walks'] = { images: small, fullImages: full, thumbnail: small[0], folder: 'cloud' } as any;
        console.log('Using Cloudinary images for Nature Walks:', small.length, 'images');
      } else {
        const candidateFolders = ["nature walks", "nature-walks", "nature_walks", "naturewalks", "nature"];
        let { images, thumbnail, folder } = tryImportImages(candidateFolders);
        // Exclude the specific bad image if present
        images = images.filter((img) => !img.toLowerCase().includes("pic3.webp"));
        if (images.length > 0) {
          // ensure thumbnail is still valid after filtering
          if (!images.includes(thumbnail as string)) thumbnail = images[0];
          map['Nature Walks'] = { images, thumbnail, folder };
          console.log('Matched Nature Walks folder:', folder, images.length, 'images');
        } else {
          // fallback to a nature-themed image (avoid safari fallback)
          map['Nature Walks'] = { images: [natureFallbackImg], thumbnail: natureFallbackImg, folder: 'fallback' };
          console.warn('No images found for Nature Walks after filtering; using fallback');
        }
      }
    }
    console.log("Activity assets loaded:", map);
    return map;
  }, []);

  // Random initial indices per activity so their thumbnails vary
  const initialIndices = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(activityAssets).forEach(([title, data]) => {
      const len = data.images.length || 1;
      map[title] = Math.floor(Math.random() * len);
    });
    if (process.env.NODE_ENV !== 'production') {
      console.debug('Activity initial indices:', map);
    }
    return map;
  }, [activityAssets]);

  // single thumbnails (no random indices required)
  return (
    <section className="py-16 md:py-24" id="activities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover unforgettable experiences across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.title}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              images={activityAssets[activity.title]?.images}
              fullImages={activityAssets[activity.title]?.fullImages}
              folderName={activityAssets[activity.title]?.folder}
              initialIndex={initialIndices[activity.title] ?? 0}
              onOpen={(idx = 0) => {
                const data = activityAssets[activity.title];
                if (data?.fullImages && data.fullImages.length > 0) {
                  setLightboxImages(data.fullImages);
                  setInitialIndex(idx);
                  setLightboxOpen(true);
                } else if (data?.images && data.images.length > 0) {
                  setLightboxImages(data.images);
                  setInitialIndex(idx);
                  setLightboxOpen(true);
                }
              }}
            />
          ))}
        </div>
        <ImageLightbox images={lightboxImages} open={lightboxOpen} initialIndex={initialIndex} onOpenChange={setLightboxOpen} />
      </div>
    </section>
  );
}
