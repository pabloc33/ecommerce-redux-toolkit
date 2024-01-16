import {
  authSlice,
  login,
  logout,
} from "../../../src/features/slices/authSlice";
import {
  authInicialState,
  authUser,
  userLogin,
} from "../../fixtures/authFixture";

describe("Pruebas en authSlice", () => {
  test("debe regresar el estado inicial y llamarse auth", () => {
    const state = authSlice.reducer(authInicialState, {});

    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(authInicialState);
  });

  test("should update state with user object when login is called", () => {
    const state = authSlice.reducer(authInicialState, login(authUser));

    expect(state.user).toEqual(authUser);
    expect(state.user.authUser).toBe(true);
  });

  test("debe llamar el logout y limpiarse", () => {
    const state = authSlice.reducer(userLogin, logout());

    expect(state.user.authUser).toBe(false);
    expect(state).toEqual(authInicialState);
  });
});
