import {
  alpha,
  InputBase,
  styled,
  InputBaseProps,
  Menu,
  MenuItem,
  LinearProgress,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useCallback, useContext, useEffect } from "react";
import {
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { NasFile } from "common";
import { pocketBase } from "../../services/pocketBaseService";
import { UIContext } from "../../contexts/UIProvider";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "black",
  backgroundColor: alpha("rgb(62, 80, 96)", 0.15),
  "&:hover": {
    backgroundColor: alpha("rgb(62, 80, 96)", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export function AppBarSearchField(props: InputBaseProps) {
  const router = useRouter();
  const popupState = usePopupState({ variant: "popover", popupId: "search" });
  const { notify } = useContext(UIContext);
  const [searchResults, setSearchResults] = React.useState<NasFile[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [searching, setSearching] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>(
    (router.query?.fileName as string) ?? ""
  );

  const search = useCallback(async () => {
    setSearching(true);
    if (searchQuery) {
      try {
        const results = await pocketBase.searchFiles(searchQuery);
        setSearchResults(results);
      } catch (err) {
        notify(`${err}`, "error");
      } finally {
        setSearching(false);
      }
    }
  }, [searchQuery]);

  const clear = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    router.push(`/?folder=${router.query?.folder}`);
  }, []);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        color="secondary"
        value={searchQuery}
        {...bindFocus(popupState)}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        {...props}
        endAdornment={
          searchQuery.length > 0 && (
            <IconButton onClick={clear}>
              <ClearIcon color="primary" />
            </IconButton>
          )
        }
      />
      {searchQuery.length > 0 && (
        <Menu {...bindMenu(popupState)}>
          {searchResults.length === 0 && !searching && (
            <MenuItem sx={{ width: "40ch" }}>No Result</MenuItem>
          )}
          {searching && <LinearProgress sx={{ width: "40ch" }} />}
          {searchResults.map((result) => (
            <MenuItem
              key={result.id}
              sx={{ width: "40ch" }}
              onClick={() => {
                popupState.close();
                router.push(
                  `/?folder=${result.parent}&file=${result.id}&fileName=${result.name}`
                );
              }}
            >
              {result.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Search>
  );
}
