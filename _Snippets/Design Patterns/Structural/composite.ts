/**
 * The base ComponentComposite class declares common operations for both simple2 and
 * complex objects of a composition.
 */
abstract class ComponentComposite {
  protected parent!: ComponentComposite | null;

  /**
   * Optionally, the base ComponentComposite can declare an interface for setting and
   * accessing a parent of the component in a tree structure. It can also
   * provide some default implementation for these methods.
   */
  public setParent(parent: ComponentComposite | null) {
    this.parent = parent;
  }

  public getParent(): ComponentComposite | null {
    return this.parent;
  }

  /**
   * In some cases, it would be beneficial to define the child-management
   * operations right in the base ComponentComposite class. This way, you won't need to
   * expose any concrete component classes to the client code, even during the
   * object tree assembly. The downside is that these methods will be empty
   * for the leaf-level components.
   */
  public add(component: ComponentComposite): void { }

  public remove(component: ComponentComposite): void { }

  /**
   * You can provide a method that lets the client code figure out whether a
   * component can bear children.
   */
  public isComposite(): boolean {
    return false;
  }

  /**
   * The base ComponentComposite may implement some default behavior or leave it to
   * concrete classes (by declaring the method containing the behavior as
   * "abstract").
   */
  public abstract operation(): string;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
class Leaf extends ComponentComposite {
  public operation(): string {
    return 'Leaf';
  }
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 */
class Composite extends ComponentComposite {
  protected children: ComponentComposite[] = [];

  /**
   * A composite object can add or remove other components (both simple2 or
   * complex) to or from its child list.
   */
  public add(component: ComponentComposite): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: ComponentComposite): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  /**
   * The Composite executes its primary logic in a particular way. It
   * traverses recursively through all its children, collecting and summing
   * their results. Since the composite's children pass these calls to their
   * children and so forth, the whole object tree is traversed as a result.
   */
  public operation(): string {
    const results = [] as string[];
    for (const child of this.children) {
      results.push(child.operation());
    }

    return `Branch(${results.join('+')})`;
  }
}

/**
 * The client code works with all of the components via the base interface.
 */
function clientCode(component: ComponentComposite) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

/**
 * This way the client code can support the simple2 leaf components...
 */
const simple2 = new Leaf();
console.log('Client: I\'ve got a simple2 component:');
clientCode(simple2);
console.log('');

/**
 * ...as well as the complex composites.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
 * Thanks to the fact that the child-management operations are declared in the
 * base ComponentComposite class, the client code can work with any component, simple2 or
 * complex, without depending on their concrete classes.
 */
function clientCode2(component1: ComponentComposite, component2: ComponentComposite) {
  // ...

  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);

  // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple2);
