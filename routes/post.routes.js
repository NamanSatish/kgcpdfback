var express = require('express')
var router = express.Router()
var pdfFiller   = require('pdffiller');
var sourcePDF = "kgcpayv2.pdf";
var destinationPDF = "filled_in.pdf"
var nameRegex = null;  
var pdfinfo

var coversionMatrix = {"Union":"Union","NonPLA":"NonPLA","Class_2":"Class_2","HRS_2":"HRS_2","ST_2":"ST_2","OT_2":"OT_2","DT_2":"DT_2","Class_3":"Class_3","HRS_3":"HRS_3","ST_3":"ST_3","OT_3":"OT_3","DT_3":"DT_3","Class_4":"Class_4","HRS_4":"HRS_4","ST_4":"ST_4","OT_4":"OT_4","DT_4":"DT_4","HRS_5":"HRS_5","ST_5":"ST_5","OT_5":"OT_5","DT_5":"DT_5","Class_6":"Class_6","HRS_6":"HRS_6","ST_6":"ST_6","OT_6":"OT_6","DT_6":"DT_6","Class_7":"Class_7","HRS_7":"HRS_7","ST_7":"ST_7","OT_7":"OT_7","DT_7":"DT_7","Class_8":"Class_8","HRS_8":"HRS_8","ST_8":"ST_8","OT_8":"OT_8","DT_8":"DT_8","Class_9":"Class_9","HRS_9":"HRS_9","ST_9":"ST_9","OT_9":"OT_9","DT_9":"DT_9","Class_10":"Class_10","HRS_10":"HRS_10","ST_10":"ST_10","OT_10":"OT_10","DT_10":"DT_10","Class_11":"Class_11","HRS_11":"HRS_11","ST_11":"ST_11","OT_11":"OT_11","DT_11":"DT_11","Class_12":"Class_12","HRS_12":"HRS_12","ST_12":"ST_12","OT_12":"OT_12","DT_12":"DT_12","Amount_2":"Amount_2","Amount_3":"Amount_3","Amount_4":"Amount_4","Amount_5":"Amount_5","Amount_6":"Amount_6","Amount_7":"Amount_7","Amount_8":"Amount_8","Amount_9":"Amount_9","Amount_10":"Amount_10","Day":"Day","Date":"Date","Contract":"Contract","Time_Material":"Time Material","CORyes":"CORyes","CORno":"CORno","Workday5to8":"Workday5to8","Workday4to10":"Workday4to10","Travel1":"Travel1","PerDiem2":"PerDiem2","PerDiem1":"PerDiem1","Travel2":"Travel2","Travel3":"Travel3","PerDiem3":"PerDiem3","PerDiem4":"PerDiem4","PerDiem5":"PerDiem5","Travel7":"Travel7","PerDiem6":"PerDiem6","PerDiem7":"PerDiem7","PerDiem8":"PerDiem8","PerDiem9":"PerDiem9","PerDiem10":"PerDiem10","PerDiem11":"PerDiem11","PerDiem12":"PerDiem12","Travel12":"Travel12","Travel11":"Travel11","Travel10":"Travel10","Travel9":"Travel9","Travel8":"Travel8","Travel6":"Travel6","Travel5":"Travel5","Travel4":"Travel4","Account1":"Account1","Account2":"Account2","Account3":"Account3","Account4":"Account4","Account5":"Account5","Account6":"Account6","Account7":"Account7","Account8":"Account8","Account9":"Account9","Account10":"Account10","Credit10":"Credit10","Credit9":"Credit9","Credit8":"Credit8","Credit7":"Credit7","Credit6":"Credit6","Credit5":"Credit5","Credit4":"Credit4","Credit3":"Credit3","Credit2":"Credit2","Credit1":"Credit1","ExtraTool29":"ExtraTool29","ExtraTool30":"ExtraTool30","ExtraTool31":"ExtraTool31","ExtraTool32":"ExtraTool32","DescriptionWork":"DescriptionWork","InspectionReport":"InspectionReport","AddInfo":"AddInfo","AuthorizedName":"AuthorizedName","Name1":"Name1","Name2":"Name2","Name3":"Name3","Name6":"Name6","Name5":"Name5","Name4":"Name4","Name7":"Name7","Name8":"Name8","Name9":"Name9","Name10":"Name10","Name11":"Name11","Name12":"Name12","Outside1":"Outside1","Outside2":"Outside2","Outside3":"Outside3","Outside4":"Outside4","Outside5":"Outside5","Subcontactor1":"Subcontactor1","Subcontactor2":"Subcontactor2","Subcontactor3":"Subcontactor3","Subcontactor4":"Subcontactor4","Subcontactor5":"Subcontactor5","Subcontactor6":"Subcontactor6","Subcontactor7":"Subcontactor7","OutsideEqpt1Num":"OutsideEqpt1Num","OutsideEqpt2Num":"OutsideEqpt2Num","OutsideEqpt3Num":"OutsideEqpt3Num","OutsideEqpt4Num":"OutsideEqpt4Num","OutsideEqpt5Num":"OutsideEqpt5Num","OutsideHours2":"OutsideHours2","OutsideHours1":"OutsideHours1","OutsideHours3":"OutsideHours3","OutsideHours4":"OutsideHours4","OutsideHours5":"OutsideHours5","SubcontTimeIn1":"SubcontTimeIn1","SubcontTimeIn2":"SubcontTimeIn2","SubcontTimeIn3":"SubcontTimeIn3","SubcontTimeIn4":"SubcontTimeIn4","SubcontTimeIn6":"SubcontTimeIn6","SubcontTimeIn5":"SubcontTimeIn5","SubcontTimeIn7":"SubcontTimeIn7","SubcontTimeOut1":"SubcontTimeOut1","SubcontTimeOut2":"SubcontTimeOut2","SubcontTimeOut3":"SubcontTimeOut3","SubcontTimeOut4":"SubcontTimeOut4","SubcontTimeOut5":"SubcontTimeOut5","SubcontTimeOut6":"SubcontTimeOut6","SubcontTimeOut7":"SubcontTimeOut7","ExtraToolNum29":"ExtraToolNum29","ExtraToolNum30":"ExtraToolNum30","ExtraToolNum31":"ExtraToolNum31","ExtraToolNum32":"ExtraToolNum32","ExtraToolHrsUsed29":"ExtraToolHrsUsed29","ExtraToolHrsUsed30":"ExtraToolHrsUsed30","ExtraToolHrsUsed31":"ExtraToolHrsUsed31","ExtraToolHrsUsed32":"ExtraToolHrsUsed32","ExtraToolNum29_2":"ExtraToolNum29_2","ExtraToolNum30_2":"ExtraToolNum30_2","ExtraToolNum31_2":"ExtraToolNum31_2","ExtraToolNum32_2":"ExtraToolNum32_2","ExtraToolHrsUsed29_2":"ExtraToolHrsUsed29_2","ExtraToolHrsUsed30_2":"ExtraToolHrsUsed30_2","ExtraToolHrsUsed31_2":"ExtraToolHrsUsed31_2","ExtraToolHrsUsed32_2":"ExtraToolHrsUsed32_2","ExtraToolNum33":"ExtraToolNum33","ExtraToolHrsUsed33":"ExtraToolHrsUsed33","ExtraToolNum33_2":"ExtraToolNum33_2","ExtraToolHrsUsed33_2":"ExtraToolHrsUsed33_2","OutsidePurchase2":"OutsidePurchase2","OutsidePurchase3":"OutsidePurchase3","OutsidePurchase4":"OutsidePurchase4","OutsidePurchase5":"OutsidePurchase5","OutsidePurchase6":"OutsidePurchase6","OutsidePurchase7":"OutsidePurchase7","OutsidePurchase8":"OutsidePurchase8","OutsidePurchase9":"OutsidePurchase9","OutsidePurchase1":"OutsidePurchase1","OutsidePurchase10":"OutsidePurchase10","Customer_Name":"Customer_Name","Customer_Order":"Customer_Order","Delivery_Address":"Delivery_Address","Delivery_Address_2":"Delivery_Address 2","COR_Number":"COR_Number","Prevailing_Wage":"Prevailing_Wage","Class_1":"Class_1","HRS_1":"HRS_1","ST_1":"ST_1","OT_1":"OT_1","DT_1":"DT_1","Eqpt1_Truck_Tools":"Eqpt1_Truck_Tools","HrsUsed1_Truck_Tools":"HrsUsed1_Truck_Tools","Eqpt1_Truck_Tools_2":"Eqpt1_Truck_Tools_2","HrsUsed1_Truck_Tools_2":"HrsUsed1_Truck_Tools_2","Eqpt2_Backhoe":"Eqpt2_Backhoe","HrsUsed2_Backhoe":"HrsUsed2_Backhoe","Eqpt2_Backhoe_2":"Eqpt2_Backhoe_2","HrsUsed2_Backhoe_2":"HrsUsed2_Backhoe_2","Eqpt3_Drill_Rig_Tool_Truck":"Eqpt3_Drill_Rig_Tool_Truck","HrsUsed3_Drill_Rig_Tool_Truck":"HrsUsed3_Drill_Rig_Tool_Truck","Eqpt3_Drill_Rig_Tool_Truck_2":"Eqpt3_Drill_Rig_Tool_Truck_2","HrsUsed3_Drill_Rig_Tool_Truck_2":"HrsUsed3_Drill_Rig_Tool_Truck_2","Eqpt4_Drill_Rig_Foundation":"Eqpt4_Drill_Rig_Foundation","HrsUsed4_Drill_Rig_Foundation":"HrsUsed4_Drill_Rig_Foundation","Eqpt4_Drill_Rig_Foundation_2":"Eqpt4_Drill_Rig_Foundation_2","HrsUsed4_Drill_Rig_Foundation_2":"HrsUsed4_Drill_Rig_Foundation_2","Class_5":"Class_5","Eqpt5_Dump_Truck_Bobtail":"Eqpt5_Dump_Truck_Bobtail","HrsUsed5_Dump_Truck_Bobtail":"HrsUsed5_Dump_Truck_Bobtail","Eqpt5_Dump_Truck_Bobtail_2":"Eqpt5_Dump_Truck_Bobtail_2","HrsUsed5_Dump_Truck_Bobtail_2":"HrsUsed5_Dump_Truck_Bobtail_2","Eqpt6_Dump_Truck_Super_10":"Eqpt6_Dump_Truck_Super_10","HrsUsed6_Dump_Truck_Super_10":"HrsUsed6_Dump_Truck_Super_10","Eqpt6_Dump_Truck_Super_10_2":"Eqpt6_Dump_Truck_Super_10_2","HrsUsed6_Dump_Truck_Super_10_2":"HrsUsed6_Dump_Truck_Super_10_2","Eqpt7_Well_Tool_Truck":"Eqpt7_Well_Tool_Truck","HrsUsed7_Well_Tool_Truck":"HrsUsed7_Well_Tool_Truck","Eqpt7_Well_Tool_Truck_2":"Eqpt7_Well_Tool_Truck_2","HrsUsed7_Well_Tool_Truck_2":"HrsUsed7_Well_Tool_Truck_2","Eqpt8_Well_Drill_Wtr_Trk_Mud":"Eqpt8_Well_Drill_Wtr_Trk_Mud","HrsUsed8_Well_Drill_Wtr_Trk_Mud":"HrsUsed8_Well_Drill_Wtr_Trk_Mud","Eqpt8_Well_Drill_Wtr_Trk_Mud_2":"Eqpt8_Well_Drill_Wtr_Trk_Mud_2","HrsUsed8_Well_Drill_Wtr_Trk_Mud_2":"HrsUsed8_Well_Drill_Wtr_Trk_Mud_2","Eqpt9_Skid_Steer":"Eqpt9_Skid_Steer","HrsUsed9_Skid_Steer":"HrsUsed9_Skid_Steer","Eqpt9_Skid_Steer_2":"Eqpt9_Skid_Steer_2","HrsUsed9_Skid_Steer_2":"HrsUsed9_Skid_Steer_2","Eqpt10_MiniExcavator":"Eqpt10_MiniExcavator","HrsUsed10_MiniExcavator":"HrsUsed10_MiniExcavator","Eqpt10_MiniExcavator_2":"Eqpt10_MiniExcavator_2","HrsUsed10_MiniExcavator_2":"HrsUsed10_MiniExcavator_2","Eqpt11_Skip_Loader":"Eqpt11_Skip_Loader","HrsUsed11_Skip_Loader":"HrsUsed11_Skip_Loader","Eqpt11_Skip_Loader_2":"Eqpt11_Skip_Loader_2","HrsUsed11_Skip_Loader_2":"HrsUsed11_Skip_Loader_2","Eqpt12_Compactor_Upright":"Eqpt12_Compactor_Upright","HrsUsed12_Compactor_Upright":"HrsUsed12_Compactor_Upright","Eqpt12_Compactor_Upright_2":"Eqpt12_Compactor_Upright_2","HrsUsed12_Compactor_Upright_2":"HrsUsed12_Compactor_Upright_2","Eqpt13_Compactor_Rideon":"Eqpt13_Compactor_Rideon","HrsUsed13_Compactor_Rideon":"HrsUsed13_Compactor_Rideon","Eqpt13_Compactor_Rideon_2":"Eqpt13_Compactor_Rideon_2","HrsUsed13_Compactor_Rideon_2":"HrsUsed13_Compactor_Rideon_2","Invoice_Ticket_1":"Invoice_Ticket_1","Amount_1":"Amount_1","Eqpt14_Compressor_Truck_Demo":"Eqpt14_Compressor_Truck_Demo","HrsUsed14_Compressor_Truck_Demo":"HrsUsed14_Compressor_Truck_Demo","Eqpt14_Compressor_Truck_Demo_2":"Eqpt14_Compressor_Truck_Demo_2","HrsUsed14_Compressor_Truck_Demo_2":"HrsUsed14_Compressor_Truck_Demo_2","Invoice_Ticket_2":"Invoice_Ticket_2","Eqpt15_Compressor_Towable":"Eqpt15_Compressor_Towable","HrsUsed15_Compressor_Towable":"HrsUsed15_Compressor_Towable","Eqpt15_Compressor_Towable_2":"Eqpt15_Compressor_Towable_2","HrsUsed15_Compressor_Towable_2":"HrsUsed15_Compressor_Towable_2","Invoice_Ticket_3":"Invoice_Ticket_3","Eqpt16_Forklift_Reach_5K":"Eqpt16_Forklift_Reach_5K","HrsUsed16_Forklift_Reach_5K":"HrsUsed16_Forklift_Reach_5K","Eqpt16_Forklift_Reach_5K_2":"Eqpt16_Forklift_Reach_5K_2","HrsUsed16_Forklift_Reach_5K_2":"HrsUsed16_Forklift_Reach_5K_2","Invoice_Ticket_4":"Invoice_Ticket_4","Eqpt17_Forklift_Reach_10K":"Eqpt17_Forklift_Reach_10K","HrsUsed17_Forklift_Reach_10K":"HrsUsed17_Forklift_Reach_10K","Eqpt17_Forklift_Reach_10K_2":"Eqpt17_Forklift_Reach_10K_2","Invoice_Ticket_5":"Invoice   Ticket_5","HrsUsed17_Forklift_Reach_10K_2":"HrsUsed17 Forklift Reach 10K_2","Eqpt18_Forklift_Warehouse":"Eqpt18_Forklift_Warehouse","HrsUsed18_Forklift_Warehouse":"HrsUsed18_Forklift_Warehouse","Eqpt18_Forklift_Warehouse_2":"Eqpt18_Forklift_Warehouse_2","HrsUsed18_Forklift_Warehouse_2":"HrsUsed18_Forklift_Warehouse_2","Invoice_Ticket_6":"Invoice_Ticket_6","Eqpt19_Generator_Welder":"Eqpt19_Generator_Welder","HrsUsed19_Generator_Welder":"HrsUsed19_Generator_Welder","Eqpt19_Generator_Welder_2":"Eqpt19_Generator_Welder_2","HrsUsed19_Generator_Welder_2":"HrsUsed19_Generator_Welder_2","Invoice_Ticket_7":"Invoice_Ticket_7","Eqpt20_Scissor_Lift":"Eqpt20_Scissor_Lift","HrsUsed20_Scissor_Lift":"HrsUsed20_Scissor_Lift","Eqpt20_Scissor_Lift_2":"Eqpt20_Scissor_Lift_2","HrsUsed20_Scissor_Lift_2":"HrsUsed20_Scissor_Lift_2","Invoice_Ticket_8":"Invoice_Ticket_8","Eqpt21_Trencher_Rideon":"Eqpt21_Trencher_Rideon","HrsUsed21_Trencher_Rideon":"HrsUsed21_Trencher_Rideon","Eqpt21_Trencher_Rideon_2":"Eqpt21_Trencher_Rideon_2","HrsUsed21_Trencher_Rideon_2":"HrsUsed21_Trencher_Rideon_2","Invoice_Ticket_9":"Invoice_Ticket_9","Eqpt22_Trencher_Walk_Behind":"Eqpt22_Trencher_Walk_Behind","HrsUsed22_Trencher_Walk_Behind":"HrsUsed22_Trencher_Walk_Behind","Eqpt22_Trencher_Walk_Behind_2":"Eqpt22_Trencher_Walk_Behind_2","HrsUsed22_Trencher_Walk_Behind_2":"HrsUsed22_Trencher_Walk_Behind_2","Invoice_Ticket_10":"Invoice_Ticket_10","Eqpt23_Water_Trailer":"Eqpt23_Water_Trailer","HrsUsed23_Water_Trailer":"HrsUsed23_Water_Trailer","Eqpt23_Water_Trailer_2":"Eqpt23_Water_Trailer_2","HrsUsed23_Water_Trailer_2":"HrsUsed23_Water_Trailer_2","Eqpt24_Water_Truck_2000_gal":"Eqpt24_Water_Truck_2000_gal","HrsUsed24_Water_Truck_2000_gal":"HrsUsed24_Water_Truck_2000_gal","Eqpt25_Development_Rig":"Eqpt25_Development_Rig","HrsUsed25_Development_Rig":"HrsUsed25_Development_Rig","HrsUsed25_Development_Rig_2":"HrsUsed25 Development Rig_2","Eqpt25_Development_Rig_2":"Eqpt25 Development Rig_2","Eqpt26_Rail_Rig":"Eqpt26_Rail_Rig","HrsUsed26_Rail_Rig":"HrsUsed26_Rail_Rig","Eqpt26_Rail_Rig_2":"Eqpt26_Rail_Rig_2","HrsUsed26_Rail_Rig_2":"HrsUsed26_Rail_Rig_2","Eqpt27_Welding_Truck":"Eqpt27_Welding_Truck","HrsUsed27_Welding_Truck":"HrsUsed27_Welding_Truck","Eqpt27_Welding_Truck_2":"Eqpt27_Welding_Truck_2","HrsUsed27_Welding_Truck_2":"HrsUsed27_Welding_Truck_2","Eqpt28_Compressor_Small":"Eqpt28_Compressor_Small","HrsUsed28 Compressor Small":"HrsUsed28 Compressor Small","Eqpt28_Compressor_Small_2":"Eqpt28_Compressor_Small_2","HrsUsed28_Compressor_Small_2":"HrsUsed28_Compressor_Small_2","Job_Number":"Job_Number","Job_Name":"Job_Name","City_State_Zip_Code":"City_State_Zip_Code","Job_Address":"Job_Address","Customer_Contact":"Customer_Contact"}
var Fill = [{"title":"Union","fieldType":"Button","fieldValue":"Off"},{"title":"NonPLA","fieldType":"Button","fieldValue":"Off"},{"title":"Class_2","fieldType":"Text","fieldValue":""},{"title":"HRS_2","fieldType":"Text","fieldValue":""},{"title":"ST_2","fieldType":"Text","fieldValue":""},{"title":"OT_2","fieldType":"Text","fieldValue":""},{"title":"DT_2","fieldType":"Text","fieldValue":""},{"title":"Class_3","fieldType":"Text","fieldValue":""},{"title":"HRS_3","fieldType":"Text","fieldValue":""},{"title":"ST_3","fieldType":"Text","fieldValue":""},{"title":"OT_3","fieldType":"Text","fieldValue":""},{"title":"DT_3","fieldType":"Text","fieldValue":""},{"title":"Class_4","fieldType":"Text","fieldValue":""},{"title":"HRS_4","fieldType":"Text","fieldValue":""},{"title":"ST_4","fieldType":"Text","fieldValue":""},{"title":"OT_4","fieldType":"Text","fieldValue":""},{"title":"DT_4","fieldType":"Text","fieldValue":""},{"title":"HRS_5","fieldType":"Text","fieldValue":""},{"title":"ST_5","fieldType":"Text","fieldValue":""},{"title":"OT_5","fieldType":"Text","fieldValue":""},{"title":"DT_5","fieldType":"Text","fieldValue":""},{"title":"Class_6","fieldType":"Text","fieldValue":""},{"title":"HRS_6","fieldType":"Text","fieldValue":""},{"title":"ST_6","fieldType":"Text","fieldValue":""},{"title":"OT_6","fieldType":"Text","fieldValue":""},{"title":"DT_6","fieldType":"Text","fieldValue":""},{"title":"Class_7","fieldType":"Text","fieldValue":""},{"title":"HRS_7","fieldType":"Text","fieldValue":""},{"title":"ST_7","fieldType":"Text","fieldValue":""},{"title":"OT_7","fieldType":"Text","fieldValue":""},{"title":"DT_7","fieldType":"Text","fieldValue":""},{"title":"Class_8","fieldType":"Text","fieldValue":""},{"title":"HRS_8","fieldType":"Text","fieldValue":""},{"title":"ST_8","fieldType":"Text","fieldValue":""},{"title":"OT_8","fieldType":"Text","fieldValue":""},{"title":"DT_8","fieldType":"Text","fieldValue":""},{"title":"Class_9","fieldType":"Text","fieldValue":""},{"title":"HRS_9","fieldType":"Text","fieldValue":""},{"title":"ST_9","fieldType":"Text","fieldValue":""},{"title":"OT_9","fieldType":"Text","fieldValue":""},{"title":"DT_9","fieldType":"Text","fieldValue":""},{"title":"Class_10","fieldType":"Text","fieldValue":""},{"title":"HRS_10","fieldType":"Text","fieldValue":""},{"title":"ST_10","fieldType":"Text","fieldValue":""},{"title":"OT_10","fieldType":"Text","fieldValue":""},{"title":"DT_10","fieldType":"Text","fieldValue":""},{"title":"Class_11","fieldType":"Text","fieldValue":""},{"title":"HRS_11","fieldType":"Text","fieldValue":""},{"title":"ST_11","fieldType":"Text","fieldValue":""},{"title":"OT_11","fieldType":"Text","fieldValue":""},{"title":"DT_11","fieldType":"Text","fieldValue":""},{"title":"Class_12","fieldType":"Text","fieldValue":""},{"title":"HRS_12","fieldType":"Text","fieldValue":""},{"title":"ST_12","fieldType":"Text","fieldValue":""},{"title":"OT_12","fieldType":"Text","fieldValue":""},{"title":"DT_12","fieldType":"Text","fieldValue":""},{"title":"Amount_2","fieldType":"Text","fieldValue":""},{"title":"Amount_3","fieldType":"Text","fieldValue":""},{"title":"Amount_4","fieldType":"Text","fieldValue":""},{"title":"Amount_5","fieldType":"Text","fieldValue":""},{"title":"Amount_6","fieldType":"Text","fieldValue":""},{"title":"Amount_7","fieldType":"Text","fieldValue":""},{"title":"Amount_8","fieldType":"Text","fieldValue":""},{"title":"Amount_9","fieldType":"Text","fieldValue":""},{"title":"Amount_10","fieldType":"Text","fieldValue":""},{"title":"Day","fieldType":"Text","fieldValue":""},{"title":"Date","fieldType":"Text","fieldValue":""},{"title":"Contract","fieldType":"Button","fieldValue":false},{"title":"Time Material","fieldType":"Button","fieldValue":false},{"title":"CORyes","fieldType":"Button","fieldValue":false},{"title":"CORno","fieldType":"Button","fieldValue":false},{"title":"Workday5to8","fieldType":"Button","fieldValue":false},{"title":"Workday4to10","fieldType":"Button","fieldValue":false},{"title":"Travel1","fieldType":"Button","fieldValue":false},{"title":"PerDiem2","fieldType":"Button","fieldValue":false},{"title":"PerDiem1","fieldType":"Button","fieldValue":false},{"title":"Travel2","fieldType":"Button","fieldValue":false},{"title":"Travel3","fieldType":"Button","fieldValue":false},{"title":"PerDiem3","fieldType":"Button","fieldValue":false},{"title":"PerDiem4","fieldType":"Button","fieldValue":false},{"title":"PerDiem5","fieldType":"Button","fieldValue":false},{"title":"Travel7","fieldType":"Button","fieldValue":false},{"title":"PerDiem6","fieldType":"Button","fieldValue":false},{"title":"PerDiem7","fieldType":"Button","fieldValue":false},{"title":"PerDiem8","fieldType":"Button","fieldValue":false},{"title":"PerDiem9","fieldType":"Button","fieldValue":false},{"title":"PerDiem10","fieldType":"Button","fieldValue":false},{"title":"PerDiem11","fieldType":"Button","fieldValue":false},{"title":"PerDiem12","fieldType":"Button","fieldValue":false},{"title":"Travel12","fieldType":"Button","fieldValue":false},{"title":"Travel11","fieldType":"Button","fieldValue":false},{"title":"Travel10","fieldType":"Button","fieldValue":false},{"title":"Travel9","fieldType":"Button","fieldValue":false},{"title":"Travel8","fieldType":"Button","fieldValue":false},{"title":"Travel6","fieldType":"Button","fieldValue":false},{"title":"Travel5","fieldType":"Button","fieldValue":false},{"title":"Travel4","fieldType":"Button","fieldValue":false},{"title":"Account1","fieldType":"Button","fieldValue":false},{"title":"Account2","fieldType":"Button","fieldValue":false},{"title":"Account3","fieldType":"Button","fieldValue":false},{"title":"Account4","fieldType":"Button","fieldValue":false},{"title":"Account5","fieldType":"Button","fieldValue":false},{"title":"Account6","fieldType":"Button","fieldValue":false},{"title":"Account7","fieldType":"Button","fieldValue":false},{"title":"Account8","fieldType":"Button","fieldValue":false},{"title":"Account9","fieldType":"Button","fieldValue":false},{"title":"Account10","fieldType":"Button","fieldValue":false},{"title":"Credit10","fieldType":"Button","fieldValue":false},{"title":"Credit9","fieldType":"Button","fieldValue":false},{"title":"Credit8","fieldType":"Button","fieldValue":false},{"title":"Credit7","fieldType":"Button","fieldValue":false},{"title":"Credit6","fieldType":"Button","fieldValue":false},{"title":"Credit5","fieldType":"Button","fieldValue":false},{"title":"Credit4","fieldType":"Button","fieldValue":false},{"title":"Credit3","fieldType":"Button","fieldValue":false},{"title":"Credit2","fieldType":"Button","fieldValue":false},{"title":"Credit1","fieldType":"Button","fieldValue":false},{"title":"ExtraTool29","fieldType":"Text","fieldValue":""},{"title":"ExtraTool30","fieldType":"Text","fieldValue":""},{"title":"ExtraTool31","fieldType":"Text","fieldValue":""},{"title":"ExtraTool32","fieldType":"Text","fieldValue":""},{"title":"DescriptionWork","fieldType":"Text","fieldValue":""},{"title":"InspectionReport","fieldType":"Text","fieldValue":""},{"title":"AddInfo","fieldType":"Text","fieldValue":""},{"title":"AuthorizedName","fieldType":"Text","fieldValue":""},{"title":"Name1","fieldType":"Text","fieldValue":""},{"title":"Name2","fieldType":"Text","fieldValue":""},{"title":"Name3","fieldType":"Text","fieldValue":""},{"title":"Name6","fieldType":"Text","fieldValue":""},{"title":"Name5","fieldType":"Text","fieldValue":""},{"title":"Name4","fieldType":"Text","fieldValue":""},{"title":"Name7","fieldType":"Text","fieldValue":""},{"title":"Name8","fieldType":"Text","fieldValue":""},{"title":"Name9","fieldType":"Text","fieldValue":""},{"title":"Name10","fieldType":"Text","fieldValue":""},{"title":"Name11","fieldType":"Text","fieldValue":""},{"title":"Name12","fieldType":"Text","fieldValue":""},{"title":"Outside1","fieldType":"Text","fieldValue":""},{"title":"Outside2","fieldType":"Text","fieldValue":""},{"title":"Outside3","fieldType":"Text","fieldValue":""},{"title":"Outside4","fieldType":"Text","fieldValue":""},{"title":"Outside5","fieldType":"Text","fieldValue":""},{"title":"Subcontactor1","fieldType":"Text","fieldValue":""},{"title":"Subcontactor2","fieldType":"Text","fieldValue":""},{"title":"Subcontactor3","fieldType":"Text","fieldValue":""},{"title":"Subcontactor4","fieldType":"Text","fieldValue":""},{"title":"Subcontactor5","fieldType":"Text","fieldValue":""},{"title":"Subcontactor6","fieldType":"Text","fieldValue":""},{"title":"Subcontactor7","fieldType":"Text","fieldValue":""},{"title":"OutsideEqpt1Num","fieldType":"Text","fieldValue":""},{"title":"OutsideEqpt2Num","fieldType":"Text","fieldValue":""},{"title":"OutsideEqpt3Num","fieldType":"Text","fieldValue":""},{"title":"OutsideEqpt4Num","fieldType":"Text","fieldValue":""},{"title":"OutsideEqpt5Num","fieldType":"Text","fieldValue":""},{"title":"OutsideHours2","fieldType":"Text","fieldValue":""},{"title":"OutsideHours1","fieldType":"Text","fieldValue":""},{"title":"OutsideHours3","fieldType":"Text","fieldValue":""},{"title":"OutsideHours4","fieldType":"Text","fieldValue":""},{"title":"OutsideHours5","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn1","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn2","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn3","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn4","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn6","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn5","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeIn7","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut1","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut2","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut3","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut4","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut5","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut6","fieldType":"Text","fieldValue":""},{"title":"SubcontTimeOut7","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum29","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum30","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum31","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum32","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed29","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed30","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed31","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed32","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum29_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum30_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum31_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum32_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed29_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed30_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed31_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed32_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum33","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed33","fieldType":"Text","fieldValue":""},{"title":"ExtraToolNum33_2","fieldType":"Text","fieldValue":""},{"title":"ExtraToolHrsUsed33_2","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase2","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase3","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase4","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase5","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase6","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase7","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase8","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase9","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase1","fieldType":"Text","fieldValue":""},{"title":"OutsidePurchase10","fieldType":"Text","fieldValue":""},{"title":"Customer_Name","fieldType":"Text","fieldValue":""},{"title":"Customer_Order","fieldType":"Text","fieldValue":""},{"title":"Delivery_Address","fieldType":"Text","fieldValue":""},{"title":"Delivery_Address_2","fieldType":"Text","fieldValue":""},{"title":"COR_Number","fieldType":"Text","fieldValue":""},{"title":"Prevailing_Wage","fieldType":"Button","fieldValue":"Off"},{"title":"Class_1","fieldType":"Text","fieldValue":""},{"title":"HRS_1","fieldType":"Text","fieldValue":""},{"title":"ST_1","fieldType":"Text","fieldValue":""},{"title":"OT_1","fieldType":"Text","fieldValue":""},{"title":"DT_1","fieldType":"Text","fieldValue":""},{"title":"Eqpt1_Truck_Tools","fieldType":"Text","fieldValue":""},{"title":"HrsUsed1_Truck_Tools","fieldType":"Text","fieldValue":""},{"title":"Eqpt1_Truck_Tools_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed1_Truck_Tools_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt2_Backhoe","fieldType":"Text","fieldValue":""},{"title":"HrsUsed2_Backhoe","fieldType":"Text","fieldValue":""},{"title":"Eqpt2_Backhoe_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed2_Backhoe_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt3_Drill_Rig_Tool_Truck","fieldType":"Text","fieldValue":""},{"title":"HrsUsed3_Drill_Rig_Tool_Truck","fieldType":"Text","fieldValue":""},{"title":"Eqpt3_Drill_Rig_Tool_Truck_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed3_Drill_Rig_Tool_Truck_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt4_Drill_Rig_Foundation","fieldType":"Text","fieldValue":""},{"title":"HrsUsed4_Drill_Rig_Foundation","fieldType":"Text","fieldValue":""},{"title":"Eqpt4_Drill_Rig_Foundation_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed4_Drill_Rig_Foundation_2","fieldType":"Text","fieldValue":""},{"title":"Class_5","fieldType":"Text","fieldValue":""},{"title":"Eqpt5_Dump_Truck_Bobtail","fieldType":"Text","fieldValue":""},{"title":"HrsUsed5_Dump_Truck_Bobtail","fieldType":"Text","fieldValue":""},{"title":"Eqpt5_Dump_Truck_Bobtail_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed5_Dump_Truck_Bobtail_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt6_Dump_Truck_Super_10","fieldType":"Text","fieldValue":""},{"title":"HrsUsed6_Dump_Truck_Super_10","fieldType":"Text","fieldValue":""},{"title":"Eqpt6_Dump_Truck_Super_10_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed6_Dump_Truck_Super_10_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt7_Well_Tool_Truck","fieldType":"Text","fieldValue":""},{"title":"HrsUsed7_Well_Tool_Truck","fieldType":"Text","fieldValue":""},{"title":"Eqpt7_Well_Tool_Truck_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed7_Well_Tool_Truck_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt8_Well_Drill_Wtr_Trk_Mud","fieldType":"Text","fieldValue":""},{"title":"HrsUsed8_Well_Drill_Wtr_Trk_Mud","fieldType":"Text","fieldValue":""},{"title":"Eqpt8_Well_Drill_Wtr_Trk_Mud_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed8_Well_Drill_Wtr_Trk_Mud_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt9_Skid_Steer","fieldType":"Text","fieldValue":""},{"title":"HrsUsed9_Skid_Steer","fieldType":"Text","fieldValue":""},{"title":"Eqpt9_Skid_Steer_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed9_Skid_Steer_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt10_MiniExcavator","fieldType":"Text","fieldValue":""},{"title":"HrsUsed10_MiniExcavator","fieldType":"Text","fieldValue":""},{"title":"Eqpt10_MiniExcavator_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed10_MiniExcavator_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt11_Skip_Loader","fieldType":"Text","fieldValue":""},{"title":"HrsUsed11_Skip_Loader","fieldType":"Text","fieldValue":""},{"title":"Eqpt11_Skip_Loader_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed11_Skip_Loader_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt12_Compactor_Upright","fieldType":"Text","fieldValue":""},{"title":"HrsUsed12_Compactor_Upright","fieldType":"Text","fieldValue":""},{"title":"Eqpt12_Compactor_Upright_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed12_Compactor_Upright_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt13_Compactor_Rideon","fieldType":"Text","fieldValue":""},{"title":"HrsUsed13_Compactor_Rideon","fieldType":"Text","fieldValue":""},{"title":"Eqpt13_Compactor_Rideon_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed13_Compactor_Rideon_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_1","fieldType":"Text","fieldValue":""},{"title":"Amount_1","fieldType":"Text","fieldValue":""},{"title":"Eqpt14_Compressor_Truck_Demo","fieldType":"Text","fieldValue":""},{"title":"HrsUsed14_Compressor_Truck_Demo","fieldType":"Text","fieldValue":""},{"title":"Eqpt14_Compressor_Truck_Demo_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed14_Compressor_Truck_Demo_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt15_Compressor_Towable","fieldType":"Text","fieldValue":""},{"title":"HrsUsed15_Compressor_Towable","fieldType":"Text","fieldValue":""},{"title":"Eqpt15_Compressor_Towable_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed15_Compressor_Towable_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_3","fieldType":"Text","fieldValue":""},{"title":"Eqpt16_Forklift_Reach_5K","fieldType":"Text","fieldValue":""},{"title":"HrsUsed16_Forklift_Reach_5K","fieldType":"Text","fieldValue":""},{"title":"Eqpt16_Forklift_Reach_5K_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed16_Forklift_Reach_5K_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_4","fieldType":"Text","fieldValue":""},{"title":"Eqpt17_Forklift_Reach_10K","fieldType":"Text","fieldValue":""},{"title":"HrsUsed17_Forklift_Reach_10K","fieldType":"Text","fieldValue":""},{"title":"Eqpt17_Forklift_Reach_10K_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_5","fieldType":"Text","fieldValue":""},{"title":"HrsUsed17 Forklift Reach 10K_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt18_Forklift_Warehouse","fieldType":"Text","fieldValue":""},{"title":"HrsUsed18_Forklift_Warehouse","fieldType":"Text","fieldValue":""},{"title":"Eqpt18_Forklift_Warehouse_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed18_Forklift_Warehouse_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_6","fieldType":"Text","fieldValue":""},{"title":"Eqpt19_Generator_Welder","fieldType":"Text","fieldValue":""},{"title":"HrsUsed19_Generator_Welder","fieldType":"Text","fieldValue":""},{"title":"Eqpt19_Generator_Welder_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed19_Generator_Welder_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_7","fieldType":"Text","fieldValue":""},{"title":"Eqpt20_Scissor_Lift","fieldType":"Text","fieldValue":""},{"title":"HrsUsed20_Scissor_Lift","fieldType":"Text","fieldValue":""},{"title":"Eqpt20_Scissor_Lift_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed20_Scissor_Lift_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_8","fieldType":"Text","fieldValue":""},{"title":"Eqpt21_Trencher_Rideon","fieldType":"Text","fieldValue":""},{"title":"HrsUsed21_Trencher_Rideon","fieldType":"Text","fieldValue":""},{"title":"Eqpt21_Trencher_Rideon_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed21_Trencher_Rideon_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_9","fieldType":"Text","fieldValue":""},{"title":"Eqpt22_Trencher_Walk_Behind","fieldType":"Text","fieldValue":""},{"title":"HrsUsed22_Trencher_Walk_Behind","fieldType":"Text","fieldValue":""},{"title":"Eqpt22_Trencher_Walk_Behind_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed22_Trencher_Walk_Behind_2","fieldType":"Text","fieldValue":""},{"title":"Invoice_Ticket_10","fieldType":"Text","fieldValue":""},{"title":"Eqpt23_Water_Trailer","fieldType":"Text","fieldValue":""},{"title":"HrsUsed23_Water_Trailer","fieldType":"Text","fieldValue":""},{"title":"Eqpt23_Water_Trailer_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed23_Water_Trailer_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt24_Water_Truck_2000_gal","fieldType":"Text","fieldValue":""},{"title":"HrsUsed24_Water_Truck_2000_gal","fieldType":"Text","fieldValue":""},{"title":"Eqpt25_Development_Rig","fieldType":"Text","fieldValue":""},{"title":"HrsUsed25_Development_Rig","fieldType":"Text","fieldValue":""},{"title":"HrsUsed25 Development Rig_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt25_Development_Rig_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt26_Rail_Rig","fieldType":"Text","fieldValue":""},{"title":"HrsUsed26_Rail_Rig","fieldType":"Text","fieldValue":""},{"title":"Eqpt26_Rail_Rig_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed26_Rail_Rig_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt27_Welding_Truck","fieldType":"Text","fieldValue":""},{"title":"HrsUsed27_Welding_Truck","fieldType":"Text","fieldValue":""},{"title":"Eqpt27_Welding_Truck_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed27_Welding_Truck_2","fieldType":"Text","fieldValue":""},{"title":"Eqpt28_Compressor_Small","fieldType":"Text","fieldValue":""},{"title":"HrsUsed28 Compressor Small","fieldType":"Text","fieldValue":""},{"title":"Eqpt28_Compressor_Small_2","fieldType":"Text","fieldValue":""},{"title":"HrsUsed28_Compressor_Small_2","fieldType":"Text","fieldValue":""},{"title":"Job_Number","fieldType":"Text","fieldValue":""},{"title":"Job_Name","fieldType":"Text","fieldValue":""},{"title":"City_State_Zip_Code","fieldType":"Text","fieldValue":""},{"title":"Job_Address","fieldType":"Text","fieldValue":""},{"title":"Customer_Contact","fieldType":"Text","fieldValue":""}]
//Merge done
// Mailgun

         
//var request = require("request"); // another api call library (supported by POSTMAN)

async function PromiseF(req) { // This Function will wait for whatever is inbetween before continuing
    return new Promise((resolve, reject) => {
      var information = JSON.parse(req.body.body);     
      console.log(information)

      //console.log(Fill)
      var shouldFlatten = false;
        var mappedFields = pdfFiller.mapForm2PDF( information, coversionMatrix );
      console.log(mappedFields)
        pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, mappedFields, shouldFlatten, function(err) {
          console.log("Finished")
          resolve();
          if (err) throw err;
        });
        
    
        
          
        
    })
}

/* Insert a new post */
router.post('/', async (req, res) => { //This is the command being run when you post
  await PromiseF(req)
    .then(post => res.status(201).json({
            Response: "Your message has been placed in the DB",
            message: 'If you are seeing these messages, contact Naman',
            message1:'If the following is empty,null,or err, contact Naman',
            YourPost: pdfinfo
    }))
    .catch(err => res.status(500).json("Something has gone wrong" + err))

})

module.exports = router

