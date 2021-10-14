import Menu from "../models/Menu";
import Restaurant from "../models/Restaurant";

class MenuController {
  list = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const menus = await Menu.find({ id: { $in: restaurant.menus } });

    return res.json({
      status: "success",
      data: menus,
      message: null,
    });
  };

  create = async (req, res) => {
    const { name } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    const menu = await Menu.create({ name });

    restaurant.menus.push(menu);
    restaurant.save();

    return res.json({
      status: "success",
      data: null,
      message: "Menu Created",
    });
  };

  retrieve = async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    return res.json({
      status: "success",
      data: menu,
      message: null,
    });
  };

  update = async (req, res) => {
    const { name } = req.body;
    const menu = await Menu.findById(req.params.id);
    menu.name = name;
    menu.save();

    return res.json({
      status: "success",
      data: null,
      message: "Menu Updated",
    });
  };

  delete = async (req, res) => {
    await Menu.deleteOne({ id: req.params.id });

    return res.json({
      status: "success",
      data: null,
      message: "Menu Deleted",
    });
  };

  addItem = async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    const { name, price, description, preparation_time } = req.body;
    menu.items.push({ name, price, description, preparation_time });
    menu.save();

    return res.json({
      status: "success",
      data: null,
      message: "Item Added",
    });
  };

  updateItem = async (req, res) => {
    const { id, item_id } = req.params;
    const { name, price, description, preparation_time } = req.body;
    const menu = await Menu.findById(id);
    const item = menu.items.id(item_id);
    item.name = name;
    item.price = price;
    item.description = description;
    item.preparation_time = preparation_time;
    menu.save();

    return res.json({
      status: "success",
      data: null,
      message: "Item Updated",
    });
  };

  deleteItem = async (req, res) => {
    const { id, item_id } = req.params;
    const menu = await Menu.findById(id);
    menu.items.id(item_id).remove();
    menu.save();

    return res.json({
      status: "success",
      data: null,
      message: "Item Deleted",
    });
  };
}

export default new MenuController();
