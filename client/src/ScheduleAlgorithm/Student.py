class Student:

    def __init__(self, id_num, name, city, year, to_do, list_of_potential_cities):
        self.id_num = id_num
        self.name = name
        self.city = city
        self.year = year
        self.to_do = to_do
        self.done = []
        self.exp_dates = []
        self.cities_around_me = []
        self.list_of_potential_cities = list_of_potential_cities

    def __str__(self):
        return ("Student object:\n"
                "  ID_num = {0}\n"
                "  Name = {1}\n"
                "  City = {2}\n"
                "  Year = {3}\n"
                "  To Do List = {4} \n"
                .format(self.id_num, self.name, self.city,
                        self.year, self.to_do, ))
