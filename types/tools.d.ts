/**
 * @description 将某个属性变成可选的属性
 *   @example
 * type user= {
 *  a:string;
 *  b:string
 * }
 *  type xx = SomePartial<user,'b'>
 *  const json:xx={a:'222'}
 */
type SomePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @description 复制类型
 */
type CopyProperty<T> = {
  [Key in keyof T]: T[Key];
};
