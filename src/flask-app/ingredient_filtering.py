import csv

ret_dict = {}

def filter_ingredients(dining_hall, avoids, special_diets, meals):

    for m in meals:
        if m == "Breakfast":
            ret_dict["Breakfast"] = []
        elif m == "Lunch":
            ret_dict["Lunch"] = []
        elif m == "Dinner":
            ret_dict["Dinner"] = []
    print("ret_dict:", ret_dict)
    print()

    with open(dining_hall+'_menu_data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        header = next(csv_reader) # Skip header
        for row in csv_reader:
            skip_flag = False
            
            if row[7] in meals:
                # print(set(avoids))
                # print(set(row[1].split(',')))
                # Check if any of the avoids are in the row
                for a in avoids:
                    if a in row[1]:
                        skip_flag = True
                        break
            
                if skip_flag==True:
                    continue
                for d in special_diets:
                    if d not in row[1]:
                        skip_flag = True
                        break
                if skip_flag==True:
                    continue

                # print("Row:", row)
                ret_dict[row[7]].append([row[0]] + [row[2]] + [float(row[3])] + [float(row[4])] + [float(row[5])] + [float(row[6])]) 

            
                
                #     if len(set(special_diets).intersection(set(row[1].split(',')))) == len(special_diets):
                #         ret_dict[row[7]].append(row)
                

filter_ingredients("y", ["egg","gluten"], ["vegetarian"], ["Breakfast","Dinner"])

print(ret_dict)

# print(ret_dict)