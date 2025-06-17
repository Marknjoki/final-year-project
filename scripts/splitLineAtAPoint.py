import arcpy

#  workspace
arcpy.env.workspace = r"C:\Users\Dell\Desktop\Final Year\data"  # Change this path!

# Inputs
route_lines = "routes_projected.shp"
stop_points = "route_stops_projected.shp"
output_split = "routes_split.shp"

search_radius = "10 Meters"

#  split
arcpy.SplitLineAtPoint_management(in_features=route_lines,
                                  point_features=stop_points,
                                  out_feature_class=output_split,
                                  search_radius=search_radius)

print(" Route split successfully at stop points!")



