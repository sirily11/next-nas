import { PluginSystem } from "./pluginSystem";
import TestPlugin from "./testPlugin";
import { PluginProps } from "./types";

const defaultProps: PluginProps = {
  notify: function (message: string, variant: any): void {},
  setTitle: function (title: string): void {},
  showDialog: function (children: JSX.Element): void {},
  closeDialog: function (): void {},
  useParent: function (): string | undefined {
    return undefined;
  },
  isDialogOpen: false,
};

describe("Given a plugin system", () => {
  test("Should load plugin", () => {
    const pluginSystem = new PluginSystem(defaultProps);
    pluginSystem.loadPlugin(TestPlugin, "test");
    expect(pluginSystem.plugins.length).toBe(1);
    expect(pluginSystem.plugins[0].name).toBe("test");
  });

  test("Should handle click file correctly", () => {
    const pluginSystem = new PluginSystem(defaultProps);
    pluginSystem.loadPlugin(TestPlugin, "test");
    const result = pluginSystem.onFileClick({
      name: "test",
      parent: "",
      size: 0,
      file: "",
      type: "",
      id: "",
      created: new Date(),
      updated: new Date(),
      created_by: "",
    });

    expect(result).toBe("implemented");
  });
});
